import jwt from "jsonwebtoken";
import { Response, Request, NextFunction } from "express";

import { envConfig } from "@/config";

interface JwtPayload {
  userId: string;
}

interface AuthenticatedRequest extends Request {
  user?: string | JwtPayload;
}

const authentication = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
  const tokenHeader = req.headers.authorization;

  if (!tokenHeader) {
    res.status(401).json({ status: false, msg: "Authorization header is missing" });
    return;
  }

  const token = tokenHeader.split(" ")[1];

  if (!token) {
    res.status(401).json({ status: false, msg: "Bearer token is missing" });
    return;
  }

  try {
    const decoded = jwt.verify(token, envConfig.jwtKey) as JwtPayload;
    req.user = decoded;
    next();
  } catch (err) {
    res.status(403).json({ status: false, msg: "Invalid or expired token" });
    return;
  }
};

export default authentication;
