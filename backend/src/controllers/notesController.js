const { ObjectId } = require('mongodb');
const { getDB } = require('../config/database');

// Create a new note
const createNote = async (req, res) => {
  try {
    const { title, content, tags = [] } = req.body;
    const db = getDB();
    
    const newNote = {
      userId: req.userId,
      title,
      content,
      tags: Array.isArray(tags) ? tags : [],
      isFavorite: false,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const result = await db.collection('notes').insertOne(newNote);
    
    res.status(201).json({
      message: 'Note created successfully',
      data: { _id: result.insertedId, ...newNote }
    });
  } catch (error) {
    console.error('Error creating note:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get all notes with optional search and tag filter
const getNotes = async (req, res) => {
  try {
    const { q, tags } = req.query;
    const db = getDB();
    
    let filter = { userId: req.userId };

    // Text search
    if (q) {
      filter.$text = { $search: q };
    }

    // Tag filter
    if (tags) {
      const tagArray = tags.split(',').map(t => t.trim());
      filter.tags = { $in: tagArray };
    }

    const notes = await db.collection('notes')
      .find(filter)
      .sort({ createdAt: -1 })
      .toArray();

    res.status(200).json({
      message: 'Notes retrieved successfully',
      data: notes
    });
  } catch (error) {
    console.error('Error fetching notes:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get a single note by ID
const getNoteById = async (req, res) => {
  try {
    const { id } = req.params;
    const db = getDB();

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid note ID' });
    }

    const note = await db.collection('notes').findOne({
      _id: new ObjectId(id),
      userId: req.userId
    });

    if (!note) {
      return res.status(404).json({ error: 'Note not found' });
    }

    res.status(200).json({
      message: 'Note retrieved successfully',
      data: note
    });
  } catch (error) {
    console.error('Error fetching note:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Update a note
const updateNote = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, tags, isFavorite } = req.body;
    const db = getDB();

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid note ID' });
    }

    const updateData = { updatedAt: new Date() };
    if (title) updateData.title = title;
    if (content) updateData.content = content;
    if (tags) updateData.tags = Array.isArray(tags) ? tags : [];
    if (typeof isFavorite === 'boolean') updateData.isFavorite = isFavorite;

    const result = await db.collection('notes').findOneAndUpdate(
      { _id: new ObjectId(id), userId: req.userId },
      { $set: updateData },
      { returnDocument: 'after' }
    );

    if (!result.value) {
      return res.status(404).json({ error: 'Note not found' });
    }

    res.status(200).json({
      message: 'Note updated successfully',
      data: result.value
    });
  } catch (error) {
    console.error('Error updating note:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Delete a note
const deleteNote = async (req, res) => {
  try {
    const { id } = req.params;
    const db = getDB();

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid note ID' });
    }

    const result = await db.collection('notes').deleteOne({
      _id: new ObjectId(id),
      userId: req.userId
    });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Note not found' });
    }

    res.status(200).json({ message: 'Note deleted successfully' });
  } catch (error) {
    console.error('Error deleting note:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  createNote,
  getNotes,
  getNoteById,
  updateNote,
  deleteNote
};
