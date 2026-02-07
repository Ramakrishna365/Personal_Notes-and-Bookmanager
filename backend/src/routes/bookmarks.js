const express = require('express');
const router = express.Router();
const { validateBookmark } = require('../middleware/validation');
const {
  createBookmark,
  getBookmarks,
  getBookmarkById,
  updateBookmark,
  deleteBookmark
} = require('../controllers/bookmarksController');

// POST /api/bookmarks - Create a new bookmark
router.post('/', validateBookmark, createBookmark);

// GET /api/bookmarks - Get all bookmarks with optional search and tags
router.get('/', getBookmarks);

// GET /api/bookmarks/:id - Get a single bookmark
router.get('/:id', getBookmarkById);

// PUT /api/bookmarks/:id - Update a bookmark
router.put('/:id', updateBookmark);

// DELETE /api/bookmarks/:id - Delete a bookmark
router.delete('/:id', deleteBookmark);

module.exports = router;
