import { Router } from "express";
import { createNote } from "../controllers/notesCRUD/create.js";
import { readAllNotes } from "../controllers/notesCRUD/read.js";
import { readById } from "../controllers/notesCRUD/readOne.js";
import { updateNotes } from "../controllers/notesCRUD/updateNotes.js";
import { deleteNotes } from "../controllers/notesCRUD/deleteNotes.js";

const route: Router = Router();

route.post("/create", createNote);
route.get("/", readAllNotes);
route.get("/unique/:id", readById);
route.put("/update/:id", updateNotes)
route.delete("/delete/:id", deleteNotes)

export default route;
