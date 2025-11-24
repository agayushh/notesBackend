import type { NextFunction, Request, Response } from "express";
import prisma from "../config/prismaInstance.js";

export const readAllNotes = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const allNotes = await prisma.notes.findMany({
      orderBy: {
        createdAt: "desc",
      },
      select: {
        serial: true,
        title: true,
        content: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    if (allNotes.length === 0) {
      return res.status(400).json({ message: "no notes there" });
    }
    return res.status(200).json({ message: "your notes", notes: allNotes });
  } catch (error) {
    next(error);
  }
};
