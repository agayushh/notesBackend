import type { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";

export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(error);

  // Handle Zod validation errors
  if (error instanceof ZodError) {
    return res.status(400).json({
      message: "Validation error",
      errors: error.issues.map((err) => ({
        path: err.path.join("."),
        message: err.message,
      })),
    });
  }

  // Handle Prisma errors
  if (error.constructor.name === "PrismaClientKnownRequestError") {
    return res.status(400).json({
      message: "Database error",
      error: error.message,
    });
  }

  // Default error
  return res.status(500).json({
    message: "Internal server error",
    error: process.env.NODE_ENV === "development" ? error.message : undefined,
  });
};
