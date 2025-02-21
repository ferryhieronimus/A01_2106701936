import { Request, Response, NextFunction } from "express";
import axios from "axios";
import { UnauthenticatedResponse } from "../commons/patterns/exceptions";


export const verifyJWTProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.split("Bearer ")[1];
    if (!token) {
      return res.status(401).send({ message: "Invalid token" });
    }

    // Verify token through Auth service
    try {
      const authResponse = await axios.post(
        `${process.env.AUTH_SERVICE_URL}/api/auth/verify-admin-token`,
        { token },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (authResponse.status !== 200) {
        return res.status(401).send({ message: "Invalid token" });
      }

      const verifiedUser = authResponse.data.user as {
        id: string | null;
        username: string;
        email: string;
        full_name: string | null;
        address: string | null;
        phone_number: string | null;
      };

      // Get tenant data through Tenant service
      const SERVER_TENANT_ID = process.env.TENANT_ID;
      if (!SERVER_TENANT_ID) {
        return res.status(500).send({ message: "Server Tenant ID not found" });
      }

      const tenantResponse = await axios.get(
        `${process.env.TENANT_SERVICE_URL}/api/tenants/${SERVER_TENANT_ID}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (tenantResponse.status !== 200 || !tenantResponse.data.data) {
        return res.status(500).send({ message: "Server Tenant not found" });
      }

      const tenantData = tenantResponse.data.data as {
        tenants: {
          id: string;
          owner_id: string;
        };
        tenantDetails: {
          id: string;
          tenant_id: string;
          name: string;
        };
      };

      // Check for tenant ownership
      if (verifiedUser.id !== tenantData.tenants.owner_id) {
        return res.status(401).send({ message: "Invalid token" });
      }

      req.body.user = verifiedUser;
      next();
    } catch (error) {
      return res.status(401).send({ message: "Invalid token" });
    }
  } catch (error) {
    return res
      .status(401)
      .json(new UnauthenticatedResponse("Invalid token").generate());
  }
};
