require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { connectDB } = require('./config/database');
const { authenticateToken } = require('./middleware/auth');
const notesRoutes = require('./routes/notes');
const bookmarksRoutes = require('./routes/bookmarks');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(authenticateToken);

// Routes
app.use('/api/notes', notesRoutes);
app.use('/api/bookmarks', bookmarksRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.status(200).json({ message: 'Backend is running' });
});

// Start server
const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
