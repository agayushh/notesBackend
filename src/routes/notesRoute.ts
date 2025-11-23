import { Router } from "express";
import { createNote } from "../controllers/create.js";

const route: Router = Router();

route.post("/create", createNote);

export default route;
