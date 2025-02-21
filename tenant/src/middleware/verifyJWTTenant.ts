import { Request, Response, NextFunction } from "express";
import axios from "axios";
import { UnauthenticatedResponse } from "../commons/patterns/exceptions";

export const verifyJWTTenant = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.split("Bearer ")[1];
    if (!token) {
      return res.status(401).send({ message: "Invalid token" });
    }

    try {
      // Verify token through Auth service
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

      req.body.user = verifiedUser;
      next();
    } catch (error) {
      console.log(error)
      return res.status(401).send({ message: "Invalid token" });
    }
  } catch (error) {
    return res
      .status(401)
      .json(new UnauthenticatedResponse("Invalid token").generate());
  }
};
