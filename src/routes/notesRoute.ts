import { Router } from "express";
import { createNote } from "../controllers/create.js";
import { readAllNotes } from "../controllers/read.js";
import { readById } from "../controllers/readOne.js";
import { updateNotes } from "../controllers/updateNotes.js";
import { deleteNotes } from "../controllers/deleteNotes.js";

const route: Router = Router();

route.post("/create", createNote);
route.get("/", readAllNotes);
route.get("/unique/:id", readById);
route.put("/update/:id", updateNotes)
route.delete("/delete/:id", deleteNotes)

export default route;
