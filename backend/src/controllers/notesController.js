import { Note } from "../models/Note.js";

export async function getAllNotes(req, res) {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });
    res.status(200).json(notes);
  } catch (error) {
    console.error("GET NOTES ERROR:", error);
    res.status(500).json({
      error: error.message,
    });
  }
}

export async function createNote(req, res) {
  try {
    const noteData = buildNoteData(req.body);

    if (!noteData.title || !noteData.content) {
      return res.status(400).json({
        error: "Title and content are required",
      });
    }

    const note = await Note.create(noteData);
    res.status(201).json(note);
  } catch (error) {
    console.error("CREATE NOTE ERROR:", error);
    res.status(500).json({ error: "Failed to create note" });
  }
}

export async function updateNote(req, res) {
  try {
    const { id } = req.params;
    const noteData = buildNoteData(req.body);

    if (!noteData.title || !noteData.content) {
      return res.status(400).json({
        error: "Title and content are required for full update",
      });
    }

    const note = await Note.findByIdAndUpdate(id, noteData, {
      new: true,
      runValidators: true,
    });

    if (!note) {
      return res.status(404).json({ error: "Note not found" });
    }

    res.status(200).json(note);
  } catch (error) {
    res.status(500).json({ error: "Failed to update note" });
  }
}

export async function updateNoteDetails(req, res) {
  try {
    const { id } = req.params;
    const noteData = buildNoteData(req.body);

    if (Object.keys(noteData).length === 0) {
      return res.status(400).json({
        error: "Provide at least one field to update",
      });
    }

    const note = await Note.findByIdAndUpdate(id, noteData, {
      new: true,
      runValidators: true,
    });

    if (!note) {
      return res.status(404).json({ error: "Note not found" });
    }

    res.status(200).json(note);
  } catch (error) {
    res.status(500).json({ error: "Failed to partially update note" });
  }
}

export async function deleteNote(req, res) {
  try {
    const { id } = req.params;
    const note = await Note.findByIdAndDelete(id);

    if (!note) {
      return res.status(404).json({ error: "Note not found" });
    }

    res.status(200).json({ message: "Note deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete note" });
  }
}

function buildNoteData(body) {
  const { title, content } = body;

  const noteData = {};

  if (typeof title === "string") {
    const normalizedTitle = title.trim();
    if (normalizedTitle) {
      noteData.title = normalizedTitle;
    }
  }

  if (typeof content === "string") {
    const normalizedContent = content.trim();
    if (normalizedContent) {
      noteData.content = normalizedContent;
    }
  }

  return noteData;
}
  
export async function GetWithPagination(req, res) {
  try {
    const {
      page = 1,
      limit = 10,
      sortBy = "createdAt",
      sortOrder = "desc",
      searchTerm = "",
    } = req.query;

    const pageNumber = parseInt(page);
    const limitNumber = parseInt(limit);
    const skip = (pageNumber - 1) * limitNumber;
    const order = sortOrder === "asc" ? 1 : -1;

    const searchFilter = searchTerm
      ? {
          $or: [
            {
              title: {
                $regex: searchTerm,
                $options: "i",
              },
            },
            {
              content: {
                $regex: searchTerm,
                $options: "i",
              },
            },
          ],
        }
      : {};

    const totalRecords = await Note.countDocuments(searchFilter);

    const totalPages = Math.ceil(totalRecords / limitNumber);

    const notes = await Note.find(searchFilter)
      .sort({ [sortBy]: order })
      .skip(skip)
      .limit(limitNumber);

    res.status(200).json({
      data: notes,

      pagination: {
        currentPage: pageNumber,
        limit: limitNumber,
        totalRecords,
        totalPages,
        hasNextPage: pageNumber < totalPages,
        hasPreviousPage: pageNumber > 1,
      },
    });
  } catch (error) {
    console.error("GET NOTES WITH PAGINATION ERROR:", error);

    res.status(500).json({
      error: "Failed to fetch notes with pagination",
    });
  }
}
