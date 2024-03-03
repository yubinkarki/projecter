import jwt from "jsonwebtoken";
import {Response, Request, NextFunction} from "express";

import {envConfig} from "@/config";
import {appStrings} from "@/constants";

interface JwtPayload {
  userId: string;
}

interface AuthenticatedRequest extends Request {
  user?: string | JwtPayload;
}

const {noRoute} = appStrings;

const authentication = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
  const tokenHeader = req.headers.authorization;

  if (!tokenHeader) {
    res.status(401).json({status: false, msg: "Authorization header is missing"});
    return;
  }

  const token = tokenHeader.split(" ")[1];

  if (!token) {
    res.status(401).json({status: false, msg: "Bearer token is missing"});
    return;
  }

  try {
    const decoded = jwt.verify(token, envConfig.jwtKey) as JwtPayload;
    req.user = decoded;
    next();
  } catch (err) {
    res.status(403).json({status: false, msg: "Invalid or expired token"});
    return;
  }
};

const undefinedRoute = (_: Request, res: Response) => {
  return res.status(404).json({error: true, msg: noRoute});
};

export default authentication;

export {undefinedRoute};
