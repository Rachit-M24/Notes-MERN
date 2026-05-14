import mongoose from "mongoose";

// 1.create the schema
// 2. create the model of the schema

const noteSchema = new mongoose.schema(
  {
    title: {
      type: String,
      required: true,
      error: "Please provide a title for the note",
    },
    content: {
      type: String,
      required: true,
      error: "Please provide content for the note",
    },
  },

  {
    timestamps: true,
  }, //<- This will create the Created and Updated At fields that too automatically
);

export const Note = mongoose.model("Note", noteSchema);