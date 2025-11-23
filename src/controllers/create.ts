import prisma from "../config/create.js";

import type { Request, Response, NextFunction } from "express";


export const createNote = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { title, content } = req.body;

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
