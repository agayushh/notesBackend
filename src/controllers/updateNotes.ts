import type { NextFunction, Request, Response } from "express";
import prisma from "../config/prismaInstance.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const updateNotes = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Id is required" });
    }
    const parsedId = parseInt(id as string);

    if (isNaN(parsedId)) {
      return res.status(404).json({ message: "Enter a valid id" });
    }

    const { title, content } = req.body;

    if (!title && !content) {
      return res.status(400).json({
        message: "At least one field (title or content) is required to update",
      });
    }

    const updateNote = await prisma.notes.update({
      where: {
        serial: parsedId,
      },
      data: {
        ...(title && { title }),
        ...(content && { content }),
      },
    });

    return res
      .status(200)
      .json({ message: "Note updated successfully", note: updateNote });
  },
);
