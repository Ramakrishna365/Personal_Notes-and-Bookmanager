const { ObjectId } = require('mongodb');
const { getDB } = require('../config/database');
const axios = require('axios');
const cheerio = require('cheerio');

// Fetch title from URL
const fetchTitleFromUrl = async (url) => {
  try {
    const response = await axios.get(url, { timeout: 5000 });
    const $ = cheerio.load(response.data);
    const title = $('title').text() || $('meta[property="og:title"]').attr('content') || '';
    return title.trim() || 'Untitled';
  } catch (error) {
    console.log('Could not fetch title from URL:', error.message);
    return null;
  }
};

// Create a new bookmark
const createBookmark = async (req, res) => {
  try {
    const { url, title, description, tags = [] } = req.body;
    const db = getDB();

    let finalTitle = title;
    
    // Auto-fetch title if not provided
    if (!finalTitle) {
      finalTitle = await fetchTitleFromUrl(url);
    }

    const newBookmark = {
      userId: req.userId,
      url,
      title: finalTitle || 'Untitled',
      description: description || '',
      tags: Array.isArray(tags) ? tags : [],
      isFavorite: false,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const result = await db.collection('bookmarks').insertOne(newBookmark);

    res.status(201).json({
      message: 'Bookmark created successfully',
      data: { _id: result.insertedId, ...newBookmark }
    });
  } catch (error) {
    console.error('Error creating bookmark:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get all bookmarks with optional search and tag filter
const getBookmarks = async (req, res) => {
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

    const bookmarks = await db.collection('bookmarks')
      .find(filter)
      .sort({ createdAt: -1 })
      .toArray();

    res.status(200).json({
      message: 'Bookmarks retrieved successfully',
      data: bookmarks
    });
  } catch (error) {
    console.error('Error fetching bookmarks:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get a single bookmark by ID
const getBookmarkById = async (req, res) => {
  try {
    const { id } = req.params;
    const db = getDB();

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid bookmark ID' });
    }

    const bookmark = await db.collection('bookmarks').findOne({
      _id: new ObjectId(id),
      userId: req.userId
    });

    if (!bookmark) {
      return res.status(404).json({ error: 'Bookmark not found' });
    }

    res.status(200).json({
      message: 'Bookmark retrieved successfully',
      data: bookmark
    });
  } catch (error) {
    console.error('Error fetching bookmark:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Update a bookmark
const updateBookmark = async (req, res) => {
  try {
    const { id } = req.params;
    const { url, title, description, tags, isFavorite } = req.body;
    const db = getDB();

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid bookmark ID' });
    }

    const updateData = { updatedAt: new Date() };
    if (url) updateData.url = url;
    if (title) updateData.title = title;
    if (description !== undefined) updateData.description = description;
    if (tags) updateData.tags = Array.isArray(tags) ? tags : [];
    if (typeof isFavorite === 'boolean') updateData.isFavorite = isFavorite;

    const result = await db.collection('bookmarks').findOneAndUpdate(
      { _id: new ObjectId(id), userId: req.userId },
      { $set: updateData },
      { returnDocument: 'after' }
    );

    if (!result.value) {
      return res.status(404).json({ error: 'Bookmark not found' });
    }

    res.status(200).json({
      message: 'Bookmark updated successfully',
      data: result.value
    });
  } catch (error) {
    console.error('Error updating bookmark:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Delete a bookmark
const deleteBookmark = async (req, res) => {
  try {
    const { id } = req.params;
    const db = getDB();

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid bookmark ID' });
    }

    const result = await db.collection('bookmarks').deleteOne({
      _id: new ObjectId(id),
      userId: req.userId
    });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Bookmark not found' });
    }

    res.status(200).json({ message: 'Bookmark deleted successfully' });
  } catch (error) {
    console.error('Error deleting bookmark:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  createBookmark,
  getBookmarks,
  getBookmarkById,
  updateBookmark,
  deleteBookmark
};
