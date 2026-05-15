import express from "express";
import {
  createNote,
  deleteNote,
  getAllNotes,
  updateNote,
  updateNoteDetails,
} from "../controllers/notesController.js";

const notesRouter = express.Router();

notesRouter.get("/", getAllNotes);
notesRouter.post("/", createNote);
notesRouter.put("/:id", updateNote);
notesRouter.patch("/:id", updateNoteDetails);
notesRouter.delete("/:id", deleteNote);

export default notesRouter;
