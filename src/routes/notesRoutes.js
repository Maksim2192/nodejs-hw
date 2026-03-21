import express from 'express';
import { getNotes, getNoteById, createNotes, deleteNote, updateNote } from '../controllers/notesController.js';

const router = express.Router();

router.get('/', getNotes);
router.get('/:noteId', getNoteById);
router.post('/notes', createNotes);
router.delete('/notes/:notesId', deleteNote);
router.patch('/students/:studentId', updateNote);

export default router;