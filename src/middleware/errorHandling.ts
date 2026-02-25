import { Prisma } from "@prisma/client";
import type { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import { errorMessages } from "../utils/ErrorMessage.js";
import { HTTP_STATUS } from "../utils/httpStatus.js";

export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(error);

  // Handle Zod validation errors
  if (error instanceof ZodError) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({
      success: false,
      message: errorMessages.API.NOT_FOUND,
      errors: error.issues.map((err) => ({
        path: err.path.join("."),
        message: err.message,
        code: err.code,
      })),
    });
  }

  // Handle Prisma errors
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({
      success: false,
      message: errorMessages.API.NOT_FOUND,
      error: error.message,
    });
  }

  // Default error
  return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
    success: false,
    message: errorMessages.API.INTERNAL_SERVER_ERROR,
    error: process.env.NODE_ENV === "development" ? error.message : undefined,
  });
};
