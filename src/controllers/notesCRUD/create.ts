import prisma from "../../config/prismaInstance.js";
import type { Request, Response } from "express";
import { z } from "zod";
import { HTTP_STATUS } from "../../utils/httpStatus.js";
import { errorMessages } from "../../utils/ErrorMessage.js";
import { asyncHandler } from "../../utils/asyncHandler.js";

const noteSchema = z.object({
  title: z.string().min(1, {message: errorMessages.API.NOT_FOUND}).max(30, {message: errorMessages.API.NOT_FOUND}),
  content: z.string().min(10, {message: errorMessages.API.NOT_FOUND}),
}); 

export const createNote = asyncHandler(async (req: Request, res: Response) => {
  const { title, content } = noteSchema.parse(req.body);


  const note = await prisma.notes.create({
    data: { title, content },
  });

  return res.status(HTTP_STATUS.CREATED).json({
    success: true,
    data: note,
    
  });
});
