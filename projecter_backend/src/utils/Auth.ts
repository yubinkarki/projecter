import jwt from "jsonwebtoken";
import {Response, Request, NextFunction} from "express";

import {envConfig} from "@/config";
import {appStrings} from "@/constants";

interface AuthenticatedRequest extends Request {
  user?: string | jwt.JwtPayload;
}

const {noRoute} = appStrings;

const authentication = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const tokenHeader = req.headers.authorization; // Gets -> Bearer token

  if (tokenHeader) {
    const token = tokenHeader.split(" ")[1]; // Splitting to get the token part only.

    if (!token) res.status(401).json({status: false, msg: "No token found"});

    try {
      req.user = jwt.verify(token, envConfig.jwtKey);
      return next();
    } catch (err) {
      return res.status(400).json({status: false, msg: "Invalid token"});
    }
  } else {
    return res.status(400).json({status: false, msg: "Please send bearer token"});
  }
};

const undefinedRoute = (_: Request, res: Response) => {
  return res.status(404).json({error: true, msg: noRoute});
};

export default authentication;

export {undefinedRoute};
