import type { NextFunction, Request, Response } from "express";
import { extractRequestMetadata } from "../utils/getMetaData.js";
export const requestLogger = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const metaData = extractRequestMetadata(req);

  const startTime = Date.now();

  res.on("finish",() => {
    const endTime = Date.now();
    const duration = endTime - startTime;
    console.log({
      timeStamp: new Date().toISOString(),
      method: req.method,
      path: req.path,
      status: res.statusCode,
      duration: `${duration} ms`,
      ...metaData,
    });
  })


  return next();
};
