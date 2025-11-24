import { Router } from "express";
import { createNote } from "../controllers/create.js";
import { readAllNotes } from "../controllers/read.js";
import { readById } from "../controllers/readOne.js";
const route = Router();
route.post("/create", createNote);
route.get("/", readAllNotes);
route.get("/unique/:id", readById);
export default route;
//# sourceMappingURL=notesRoute.js.map