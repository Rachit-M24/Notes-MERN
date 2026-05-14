import { Note } from "../models/Note.js";

export async function getAllNotes(req, res) {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });
    res.status(200).json(notes);
    
  } catch (error) {
    console.error("GET NOTES ERROR:", error);
    res.status(500).json({
      error: error.message
    });
  }
}


export async function createNote(req, res) {
  try {
    const { title, content } = req.body;
    const note = await Note.create({ title, content });
    res.status(201).json(note);
  } catch (error) {
    console.error("CREATE NOTE ERROR:", error);
    res.status(500).json({ error: "Failed to create note" });
  }
}

export async function updateNote(req, res) {
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    const note = await Note.findByIdAndUpdate(
      id,
      { title, content },
      { new: true },
    );
    res.status(200).json(note);
  } catch (error) {
    res.status(500).json({ error: "Failed to update note" });
  }
}
export async function updateNoteDetails(req, res) {
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    const note = await Note.findByIdAndUpdate(
      id,
      { title, content },
      { new: true },
    );
    res.status(200).json(note);
  } catch (error) {
    res.status(500).json({ error: "Failed to partially update note" });
  }
}

export async function deleteNote(req, res) {
  try {
    const { id } = req.params;
    await Note.findByIdAndDelete(id);
    res.status(200).json({ message: "Note deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete note" });
  }
}
