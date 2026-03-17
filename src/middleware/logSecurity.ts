import type { NextFunction, Request, Response } from "express";
import { extractRequestMetadata } from "../utils/getMetaData.js";
export const requestLogger = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const metaData = extractRequestMetadata(req);

  const startTime = Date.now();

  res.on("finish", () => {
    const endTime = Date.now();
    const duration = endTime - startTime;

    const logData = {
      timeStamp: new Date().toISOString(),
      method: req.method,
      path: req.path,
      status: res.statusCode,
      duration: `${duration} ms`,
      ...metaData,
    };
    if (res.statusCode.toString() >= "500") {
      console.log({
        ...logData,
        level: "WARN",
        error: res.locals.error,
      });
    } else if (res.statusCode.toString() >= "400") {
      console.log({
        ...metaData,
        level: "SERVER ERROR",
        error: res.locals.error,
      });
    } else {
      console.log({
        ...metaData,
        level: "INFO",
      });
    }
  });

  return next();
};
