import { Router } from "express";
import { healthCheck } from "../controllers/status/health.js";
import { dbConnection } from "../controllers/status/dbConnection.js";

const route: Router = Router();

route.get("/healthz", healthCheck);
route.get("/readyz", dbConnection);

export default route;