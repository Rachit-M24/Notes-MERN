import express from "express";
import {
  createNote,
  deleteNote,
  getAllNotes,
  updateNote,
  updateNoteDetails,
  GetWithPagination
} from "../controllers/notesController.js";

const notesRouter = express.Router();

notesRouter.get("/", getAllNotes);
notesRouter.get("/GetWithPagination", GetWithPagination);
notesRouter.post("/", createNote);
notesRouter.put("/:id", updateNote);
notesRouter.patch("/:id", updateNoteDetails);
notesRouter.delete("/:id", deleteNote);

export default notesRouter;
