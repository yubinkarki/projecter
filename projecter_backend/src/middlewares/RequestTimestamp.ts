import { NextFunction, Request, Response } from "express";

function timestamp(req: Request, _: Response, next: NextFunction): void {
  const now = Date.now();
  (req as Request & { timestamp: number }).timestamp = now;
  next();
}

export default timestamp;
