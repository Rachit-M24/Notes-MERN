import express from "express";
import router from "./routes/NotesRouter.js";

const app = express();
const PORT = process.env.PORT;
app.use(express.json());
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});
app.use("/api/notes", router);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});