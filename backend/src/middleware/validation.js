const validator = require('validator');

const validateNote = (req, res, next) => {
  const { title, content } = req.body;

  if (!title || typeof title !== 'string' || title.trim() === '') {
    return res.status(400).json({ error: 'Title is required and must be a non-empty string' });
  }

  if (!content || typeof content !== 'string' || content.trim() === '') {
    return res.status(400).json({ error: 'Content is required and must be a non-empty string' });
  }

  next();
};

const validateBookmark = (req, res, next) => {
  const { url, title } = req.body;

  if (!url || typeof url !== 'string' || !validator.isURL(url)) {
    return res.status(400).json({ error: 'Valid URL is required' });
  }

  if (title && typeof title !== 'string') {
    return res.status(400).json({ error: 'Title must be a string' });
  }

  next();
};

module.exports = { validateNote, validateBookmark };
