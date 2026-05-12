import express from "express";
import { createNote, deleteNote, getAllNotes, updateNote, updateNoteDetails } from "../controllers/notesController.js";

const router = express.Router();

router.get("/", getAllNotes);

router.post("/", createNote);

router.put("/:id", updateNote);

router.patch("/:id", updateNoteDetails);

router.delete("/:id", deleteNote);

export default router;