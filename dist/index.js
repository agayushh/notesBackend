import express from "express";
import route from "./routes/notesRoute.js";
import cors from "cors";
import { errorHandler } from "./middleware/errorHandling.js";
const app = express();
app.use(cors());
app.use(express.json());
app.use("/notes", route);
app.use(errorHandler);
app.listen(3000, () => {
    console.log("Server is running");
});
//# sourceMappingURL=index.js.map