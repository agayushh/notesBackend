// import type { NextFunction, Request, Response } from "express";
// import prisma from "../config/prismaInstance.js";
import prisma from "../config/prismaInstance.js";
export const readAllNotes = async (req, res, next) => {
    try {
        const page = parseInt(req.params.page) || 1;
        const limit = parseInt(req.params.limit) || 10;
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
    }
    catch (error) {
        next(error);
    }
};
//# sourceMappingURL=read.js.map