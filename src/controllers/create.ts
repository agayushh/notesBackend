import prisma from "../config/prismaInstance.js";

import type { Request, Response, NextFunction } from "express";
import { z } from "zod";

const noteSchema = z.object({
  title: z.string().min(1).max(30),
  content: z.string().min(10),
});

export const createNote = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { title, content } = noteSchema.parse(req.body);

    if (!title || !content) {
      return res
        .status(400)
        .json({ message: "title and content are required" });
    }

    const note = await prisma.notes.create({
      data: { title, content },
    });

    return res.status(201).json(note);
  } catch (error) {
    console.error(error);
    next(error);
  }
};
