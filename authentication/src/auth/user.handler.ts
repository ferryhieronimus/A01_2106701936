import { Request, Response } from "express";
import * as Service from "./services";

export const loginHandler = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    const response = await Service.loginService(username, password);
    return res.status(response.status).json(response.data);
}

export const registerHandler = async (req: Request, res: Response) => {
    const { username, email, password, full_name, address, phone_number } = req.body;
    const response = await Service.registerService(username, email, password, full_name, address, phone_number);
    return res.status(response.status).json(response.data);
}

export const verifyTokenHandler = async (req: Request, res: Response) => {
    const { token } = req.body;
    const response = await Service.verifyTokenService(token);
    return res.status(response.status).json(response.data);
}

export const verifyAdminTokenHandler = async (req: Request, res: Response) => {
    const { token } = req.body;
    const response = await Service.verifyAdminTokenService(token);
    return res.status(response.status).json(response.data);
}

export const registerHandlerV1 = async (req: Request, res: Response) => {
  const { username, email, password, full_name, address, phone_number } =
    req.body;
  const response = await Service.registerServiceV1(
    username,
    email,
    password,
    full_name,
    address,
    phone_number
  );
  return res.status(response.status).json(response.data);
};

export const loginHandlerV1 = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const response = await Service.loginServiceV1(username, password);
  return res.status(response.status).json(response.data);
};

export const verifyTokenHandlerV1 = async (req: Request, res: Response) => {
  const { token } = req.body;
  const response = await Service.verifyTokenServiceV1(token);
  return res.status(response.status).json(response.data);
};

export const verifyAdminTokenHandlerV1 = async (req: Request, res: Response) => {
  const { token } = req.body;
  const response = await Service.verifyAdminTokenServiceV1(token);
  return res.status(response.status).json(response.data);
};