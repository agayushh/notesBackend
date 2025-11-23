import express from "express";
import route from "./routes/notesRoute.js";
import cors from "cors";

const app = express();

app.use(cors())

app.use(express.json());

app.use("/notes", route);
app.use(
  (
    err: Error,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error(err.stack);
    res.status(500).json({ message: "Internal server error" });
  }
);

app.listen(3000, () => {
  console.log("Server is running");
});
