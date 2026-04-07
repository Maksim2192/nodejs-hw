import { Note } from '../models/note.js';
import createHttpError from 'http-errors';

export const getAllNotes = async (req, res) => {
  const notes = await Note.find();
  res.status(200).json(notes);
};

export const getNoteById = async (req, res, next) => {
  const { page = 1, perPage = 10 } = req.query;

  const skip = (page - 1) * perPage;

  const NotesQuery = Note.find();

    const [totalItems, notes] = await Promise.all([
    NotesQuery.clone().countDocuments(),
    NotesQuery.skip(skip).limit(perPage),
  ]);
	
  const totalPages = Math.ceil(totalItems / perPage);

  res.status(200).json({
    page,
    perPage,
    totalItems,
    totalPages,
    notes,
  });
    try {
    const { noteId } = req.params;
    const note = await Note.findById(noteId);

    if (!note) {
      throw createHttpError(404, 'Note not found');
    }

    res.status(200).json(note);
  } catch (error) {
    next(error);
  }
};

export const createNote = async (req, res) => {
    const note = await Note.create(req.body);
    res.status(201).json(note);
};

export const deleteNote = async (req, res) => {
  const { noteId } = req.params;
  const note = await Note.findOneAndDelete({
    _id: noteId,
  });

  if (!note) {
    throw createHttpError(404, "Note not found");
  }

  res.status(200).json(note);
};

export const updateNote = async (req, res) => {
  const { noteId } = req.params;

  const note = await Note.findOneAndUpdate(
    { _id: noteId },
    req.body,
    { returnDocument: "after" },
  );

  if (!note) {
	throw createHttpError(404, 'Note not found');
  }

  res.status(200).json(note);
};