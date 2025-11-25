import prisma from "../config/prismaInstance.js";
export const readAllNotes = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
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
                totalCount,
                limit,
                hasNext: page < totalPages,
                hasPrevious: page > 1,
            },
        });
    }
    catch (error) {
        next(error);
    }
};
//# sourceMappingURL=read.js.map