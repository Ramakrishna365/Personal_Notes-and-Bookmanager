const express = require('express');
const router = express.Router();
const { validateNote } = require('../middleware/validation');
const {
  createNote,
  getNotes,
  getNoteById,
  updateNote,
  deleteNote
} = require('../controllers/notesController');

// POST /api/notes - Create a new note
router.post('/', validateNote, createNote);

// GET /api/notes - Get all notes with optional search and tags
router.get('/', getNotes);

// GET /api/notes/:id - Get a single note
router.get('/:id', getNoteById);

// PUT /api/notes/:id - Update a note
router.put('/:id', updateNote);

// DELETE /api/notes/:id - Delete a note
router.delete('/:id', deleteNote);

module.exports = router;
