import express from "express";
import rateLimitMiddleware from "./middleware/rateLimitMiddleware.js";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import errorMiddleware from "./middleware/errorMiddleware.js";
import notesRouter from "./routes/notesRouter.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT;
app.use(express.json());
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});
app.use(errorMiddleware);
app.use(rateLimitMiddleware);
app.use("/api/notes", notesRouter);

connectDB()
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Failed to connect to MongoDB:", error);
    process.exit(1);
  });
