import express from "express";
import route from "./routes/notesRoute.js";
import cors from "cors";
import { errorHandler } from "./middleware/errorHandling.js";
import { requestLogger } from "./middleware/logSecurity.js";

const app = express();

app.use(cors());
app.set("trust-proxy", true);
app.use(express.json());
app.use(requestLogger);

app.use("/notes", route);
app.use(errorHandler);

app.listen(3000, () => {
  console.log("Server is running");
});
