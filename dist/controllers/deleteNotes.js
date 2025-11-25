import prisma from "../config/prismaInstance.js";
export const deleteNotes = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res
                .status(400)
                .json({ message: "You need to enter a correct id" });
        }
        const parsedId = parseInt(id);
        if (isNaN(parsedId)) {
            return res.status(400).json({ message: "format of id is not correct" });
        }
        const noteToDelete = await prisma.notes.delete({
            where: {
                serial: parsedId,
            },
        });
        res.status(200).json({ message: "Note has been deleted successfully" });
    }
    catch (error) {
        next(error);
    }
};
//# sourceMappingURL=deleteNotes.js.map