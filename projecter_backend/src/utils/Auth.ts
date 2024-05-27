import jwt from "jsonwebtoken";
import { Response, NextFunction } from "express";

import { envConfig, logger } from "@/config";
import { DecodedUserType, AuthenticatedUserInterface } from "@/constants";

function authentication(req: AuthenticatedUserInterface, res: Response, next: NextFunction): void {
  const tokenHeader: string | undefined = req.headers.authorization;

  if (!tokenHeader) {
    res.status(401).send({ status: false, msg: "Authorization header is missing" });
    return;
  }

  const token: string = tokenHeader.split(" ")[1];

  if (!token) {
    res.status(401).send({ status: false, msg: "Bearer token is missing" });
    return;
  }

  try {
    const decoded = jwt.verify(token, envConfig.jwtKey) as DecodedUserType;
    req.user = decoded;
    next();
  } catch (e) {
    logger.error("Error in jwt verification:", e);
    res.status(403).send({ status: false, msg: "Invalid or expired token" });
    return;
  }
}

export default authentication;
