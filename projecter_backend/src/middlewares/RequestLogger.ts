import { Request, Response, NextFunction } from "express";

import { logger } from "@/config";

function requestLogger(req: Request, _: Response, next: NextFunction): void {
  logger.http(`Method -> ${req.method} | IP -> ${req.ip} | URL -> ${req.originalUrl}`);
  next();
}

export default requestLogger;
