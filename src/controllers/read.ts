import type { NextFunction, Request, Response } from "express";
import prisma from "../config/prismaInstance.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const readAllNotes = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    const [notes, totalCount] = await Promise.all([
      prisma.notes.findMany({
        skip,
        take: limit,
        orderBy: {
          createdAt: "desc",
        },
      }),
      prisma.notes.count(),
    ]);
    const totalPages = Math.ceil(totalCount / limit);
    return res.status(200).json({
      notes,
      pagination: {
        currentPage: page,
        totalPages,
        skip,
        totalCount,
        limit,
        hasNext: page < totalPages,
        hasPrevious: page > 1,
      },
    });
  },
);
