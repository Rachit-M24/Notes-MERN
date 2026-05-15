import mongoose from "mongoose";

// 1.create the schema
// 2. create the model of the schema

const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide a title for the note"],
      trim: true,
    },
    content: {
      type: String,
      required: [true, "Please provide content for the note"],
      trim: true,
    },
  },

  {
    timestamps: true,
  }, //<- This will create the Created and Updated At fields that too automatically
);

export const Note = mongoose.model("Note", noteSchema);
