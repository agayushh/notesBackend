import type { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import type { AuthRequest } from "../types/AuthRequest.js";

export const authMiddleWare = (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const accessToken = req.cookies.accessToken;

    if (!accessToken) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const decoded = jwt.verify(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET!,
    ) as AuthRequest;

    req.user = decoded;

    return next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid token",
    });
  }
};
