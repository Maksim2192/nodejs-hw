import { model, Schema } from 'mongoose';

const NoteSchema = new Schema(
  {
    title: {
      type: String,
      trim: true,
    },
    content: {
      type: String,
      trim: true,
    },
    tag: {
      type: String,
      required: true,
      enum: ['Work', 'Personal', 'Meeting', 'Shopping', 'Ideas', 'Travel', 'Finance', 'Health', 'Important', 'Todo'],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const Note = model('Note', NoteSchema, 'Note');