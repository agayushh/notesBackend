import type { NextFunction, Request, Response } from "express";
import prisma from "../../config/prismaInstance.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { HTTP_STATUS } from "../../utils/httpStatus.js";

export const deleteNotes = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    if (!id) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        success: false,
        message: "You need to enter a correct id",
      });
    }
    const parsedId = parseInt(id as string);
    if (isNaN(parsedId)) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        success: false,
        message: "format of id is not correct",
      });
    }
    const noteToDelete = await prisma.notes.delete({
      where: {
        serial: parsedId,
      },
    });
    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: "Note has been deleted successfully",
    });
  },
);
