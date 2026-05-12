import express from "express";
import  router from "./routes/NotesRouter.js";

const app = express();
const PORT = process.env.PORT;

app.use("/api/notes", router);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
