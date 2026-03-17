import type { NextFunction, Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler.js";

export const healthCheck = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const health = {
      uptime: process.uptime(),
      message: "ok",
      timestamp: Date.now(),
    };

    return res.status(health.message === "ok" ? 200 : 500).json(health);
  },
);