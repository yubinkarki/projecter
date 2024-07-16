import { Request, Response, NextFunction } from "express";

import { logger } from "@/config";

function requestLogger(req: Request, _: Response, next: NextFunction): void {
  const description = `Method -> ${req.method} | IP -> ${req.ip} | URL -> ${req.originalUrl}`;
  logger.http({ filename: __filename, description, point: "requestLogger" });
  next();
}

export default requestLogger;
