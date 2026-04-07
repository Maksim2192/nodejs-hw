import { Router } from 'express';
import { getAllNotes, getNoteById, createNote, deleteNote, updateNote } from '../controllers/notesController.js';
import { getNotesSchema } from '../validations/notesValidation.js';
import { celebrate } from 'celebrate';

const router = Router();

router.get('/notes', celebrate(getNotesSchema), getAllNotes);
router.get('/notes/:noteId',  getNoteById);
router.post('/notes', createNote);
router.delete('/notes/:noteId', celebrate(deleteNotesSchema), deleteNote);
router.patch('/notes/:noteId', celebrate(updateNotesSchema), updateNote);

export default router;