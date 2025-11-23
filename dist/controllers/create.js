import prisma from "../config/create.js";
export const createNote = async (req, res, next) => {
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
    }
    catch (error) {
        console.error(error);
        next(error);
    }
};
//# sourceMappingURL=create.js.map