import type { NextFunction, Request, Response } from "express";
import { extractRequestMetadata } from "../utils/getMetaData.js";
export const requestLogger = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const metaData = extractRequestMetadata(req);

  console.log({
    timeStamp: new Date().toISOString(),
    method: req.method,
    path: req.path,
    ...metaData,
  });

  return next();
};
