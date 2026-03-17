import type { NextFunction, Request, Response } from "express";
import prisma from "../../config/prismaInstance.js";
import { asyncHandler } from "../../utils/asyncHandler.js";

export async function checkDbConnection(): Promise<boolean> {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return true;
  } catch {
    return false;
  }
}

export const dbConnection = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const ok = await checkDbConnection();
    return res.status(ok ? 200 : 500).json({
      message: ok ? "ok" : "db connection failed",
      timestamp: Date.now(),
    });
  },
);
