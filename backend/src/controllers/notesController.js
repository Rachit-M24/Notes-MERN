export async function getAllNotes(req, res) {
  res.status(200).send("Get all notes");
}

export async function createNote(req, res) {
  res.status(201).send("Create a note");
}

export async function updateNote(req, res) {
  console.log(req.params.id);
  res.status(200).send("Update a note");
}
export async function updateNoteDetails(req, res) {
  console.log(req.params.id);
  res.status(200).send("Partially update a note");
}

export async function deleteNote(req, res) {
  console.log(req.params.id);
  res.status(200).send("Delete a note");
}
