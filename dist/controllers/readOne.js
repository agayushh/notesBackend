import prisma from "../config/prismaInstance.js";
export const readById = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: "Id id required" });
        }
        const parsedId = parseInt(id);
        if (isNaN(parsedId)) {
            return res.status(400).json({ message: "Invalid Id format" });
        }
        const notesById = await prisma.notes.findUnique({
            where: {
                serial: parsedId,
            },
        });
        if (!notesById) {
            return res.status(400).json({ message: "id doesn't have any data" });
        }
        return res.status(200).json({
            message: "notes of the id",
            notes: notesById,
        });
    }
    catch (error) {
        next(error);
    }
};
//# sourceMappingURL=readOne.js.map