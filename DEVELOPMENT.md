# Development Guide

Complete reference for developing and extending the Personal Notes & Bookmark Manager.

## 📚 Table of Contents

- [Architecture](#architecture)
- [Backend Development](#backend-development)
- [Frontend Development](#frontend-development)
- [Database Schema](#database-schema)
- [API Conventions](#api-conventions)
- [Adding Features](#adding-features)
- [Testing](#testing)
- [Deployment](#deployment)

## 🏗️ Architecture

### High-Level Overview

```
┌─────────────────────────────────────────────┐
│         Frontend (Next.js/React)            │
│  (http://localhost:3000)                    │
│  - Pages: /notes, /bookmarks                │
│  - Components: Cards, Modals, SearchBar     │
│  - Styling: Tailwind CSS                    │
└────────────────────┬────────────────────────┘
                     │
                HTTP (axios)
                     │
┌────────────────────▼────────────────────────┐
│      Backend (Node.js/Express)              │
│  (http://localhost:5000/api)                │
│  - Controllers: Business Logic              │
│  - Middleware: Auth, Validation             │
│  - Database: MongoDB                        │
└─────────────────────────────────────────────┘
```

### Data Flow

```
1. User Action (Create Note)
   ↓
2. Frontend Form
   ↓
3. Validation (Frontend)
   ↓
4. API Call (axios)
   ↓
5. Backend Middleware (Auth, Validation)
   ↓
6. Controller (Business Logic)
   ↓
7. MongoDB
   ↓
8. Response (JSON)
   ↓
9. Frontend Updates State
   ↓
10. UI Re-renders
```

## 🔧 Backend Development

### Project Structure

```
backend/src/
├── config/
│   └── database.js          # MongoDB connection & setup
├── middleware/
│   ├── auth.js             # Authentication
│   └── validation.js       # Input validation
├── controllers/
│   ├── notesController.js  # Note operations
│   └── bookmarksController.js # Bookmark operations
├── routes/
│   ├── notes.js            # Note endpoints
│   └── bookmarks.js        # Bookmark endpoints
└── index.js                # Express app setup
```

### Adding a New Endpoint

#### 1. Create Controller Method

```javascript
// In src/controllers/notesController.js

const archiveNote = async (req, res) => {
  try {
    const { id } = req.params;
    const db = getDB();

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid note ID' });
    }

    const result = await db.collection('notes').findOneAndUpdate(
      { _id: new ObjectId(id), userId: req.userId },
      { $set: { isArchived: true, updatedAt: new Date() } },
      { returnDocument: 'after' }
    );

    if (!result.value) {
      return res.status(404).json({ error: 'Note not found' });
    }

    res.status(200).json({
      message: 'Note archived successfully',
      data: result.value
    });
  } catch (error) {
    console.error('Error archiving note:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { archiveNote };
```

#### 2. Add Route

```javascript
// In src/routes/notes.js

router.put('/:id/archive', archiveNote);
```

#### 3. Import and Use

```javascript
// In src/index.js

const { archiveNote } = require('./controllers/notesController');
```

### Database Operations

#### Query Examples

```javascript
const db = getDB();

// Find all documents
const notes = await db.collection('notes').find({ userId: 'user123' }).toArray();

// Find with filter
const important = await db.collection('notes').find({
  userId: 'user123',
  tags: { $in: ['important'] }
}).toArray();

// Find one
const note = await db.collection('notes').findOne({
  _id: new ObjectId(id),
  userId: 'user123'
});

// Insert
const result = await db.collection('notes').insertOne({
  userId: 'user123',
  title: 'New Note',
  content: 'Content',
  tags: [],
  isFavorite: false,
  createdAt: new Date(),
  updatedAt: new Date()
});

// Update
const result = await db.collection('notes').findOneAndUpdate(
  { _id: new ObjectId(id), userId: 'user123' },
  { $set: { title: 'Updated', updatedAt: new Date() } },
  { returnDocument: 'after' }
);

// Delete
const result = await db.collection('notes').deleteOne({
  _id: new ObjectId(id),
  userId: 'user123'
});
```

## 🎨 Frontend Development

### Project Structure

```
frontend/
├── app/
│   ├── layout.jsx         # Root layout
│   ├── page.jsx           # Home page
│   ├── globals.css        # Global styles
│   ├── notes/
│   │   └── page.jsx       # Notes page
│   └── bookmarks/
│       └── page.jsx       # Bookmarks page
├── components/
│   ├── Navigation.jsx
│   ├── SearchBar.jsx
│   ├── NoteCard.jsx
│   ├── BookmarkCard.jsx
│   ├── NoteModal.jsx
│   └── BookmarkModal.jsx
├── lib/
│   ├── api.js             # API configuration
│   └── helpers.js         # API helper functions
└── public/                # Static assets
```

### Adding a New Component

```javascript
// components/NoteFilter.jsx

'use client';

import { useState } from 'react';

export default function NoteFilter({ onFilter }) {
  const [sortBy, setSortBy] = useState('newest');

  const handleSort = (value) => {
    setSortBy(value);
    onFilter({ sortBy: value });
  };

  return (
    <div className="flex gap-2">
      <select
        value={sortBy}
        onChange={(e) => handleSort(e.target.value)}
        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
      >
        <option value="newest">Newest First</option>
        <option value="oldest">Oldest First</option>
        <option value="title">By Title</option>
      </select>
    </div>
  );
}
```

### Using the Component

```javascript
// In app/notes/page.jsx

import NoteFilter from '@/components/NoteFilter';

export default function NotesPage() {
  // ... existing code ...

  const handleFilter = ({ sortBy }) => {
    // Implement sorting logic
  };

  return (
    <div>
      {/* ... existing code ... */}
      <NoteFilter onFilter={handleFilter} />
    </div>
  );
}
```

### Adding a New Helper Function

```javascript
// In lib/helpers.js

export const toggleNoteFavorite = async (id, currentState) => {
  try {
    const config = apiClient.notes.update(id, { isFavorite: !currentState });
    const response = await axios(config);
    return response.data.data;
  } catch (error) {
    console.error('Error toggling favorite:', error);
    throw error;
  }
};
```

## 💾 Database Schema

### Notes Collection

```json
{
  "_id": ObjectId,
  "userId": "user123",
  "title": "Note Title",
  "content": "Note content here",
  "tags": ["work", "important"],
  "isFavorite": false,
  "isArchived": false,
  "createdAt": ISODate,
  "updatedAt": ISODate
}
```

### Bookmarks Collection

```json
{
  "_id": ObjectId,
  "userId": "user123",
  "url": "https://example.com",
  "title": "Example Site",
  "description": "Description of the bookmark",
  "tags": ["reference"],
  "isFavorite": false,
  "isArchived": false,
  "createdAt": ISODate,
  "updatedAt": ISODate
}
```

### Users Collection

```json
{
  "_id": ObjectId,
  "email": "user@example.com",
  "password": "hashed_password",
  "username": "username",
  "createdAt": ISODate,
  "updatedAt": ISODate
}
```

### Indexes

```javascript
// Auto-created by application
db.notes.createIndex({ userId: 1 });
db.notes.createIndex({ tags: 1 });
db.notes.createIndex({ title: 'text', content: 'text' });

db.bookmarks.createIndex({ userId: 1 });
db.bookmarks.createIndex({ tags: 1 });
db.bookmarks.createIndex({ title: 'text', url: 'text' });

db.users.createIndex({ email: 1 }, { unique: true });
```

## 📋 API Conventions

### Request Format

```
METHOD /api/resource[/:id][?query=params]
Content-Type: application/json

{
  "field1": "value1",
  "field2": "value2"
}
```

### Response Format

Success (2xx):
```json
{
  "message": "Operation successful",
  "data": { /* resource data */ }
}
```

Error (4xx, 5xx):
```json
{
  "error": "Error description"
}
```

### Status Codes

| Code | Meaning |
|------|---------|
| 200 | OK - Request succeeded |
| 201 | Created - Resource created |
| 400 | Bad Request - Invalid input |
| 404 | Not Found - Resource doesn't exist |
| 500 | Server Error - Internal error |

### Query Parameters

- `q`: Text search query
- `tags`: Comma-separated tag filter
- `page`: Pagination (future)
- `limit`: Result limit (future)
- `sort`: Sort field (future)

## ✨ Adding Features

### Example: Add Sharing Feature

#### 1. Backend - Add Share Controller

```javascript
// src/controllers/notesController.js

const shareNote = async (req, res) => {
  try {
    const { id } = req.params;
    const { email } = req.body;
    const db = getDB();

    // Validate email
    if (!validator.isEmail(email)) {
      return res.status(400).json({ error: 'Invalid email' });
    }

    // Share note
    const result = await db.collection('notes').findOneAndUpdate(
      { _id: new ObjectId(id), userId: req.userId },
      { $addToSet: { sharedWith: email } },
      { returnDocument: 'after' }
    );

    // Send email notification (implement as needed)

    res.status(200).json({
      message: 'Note shared successfully',
      data: result.value
    });
  } catch (error) {
    console.error('Error sharing note:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
```

#### 2. Backend - Add Route

```javascript
// src/routes/notes.js

router.post('/:id/share', shareNote);
```

#### 3. Frontend - Add Helper

```javascript
// lib/helpers.js

export const shareNote = async (id, email) => {
  try {
    const config = apiClient.notes.share(id, { email });
    const response = await axios(config);
    return response.data.data;
  } catch (error) {
    console.error('Error sharing note:', error);
    throw error;
  }
};
```

#### 4. Frontend - Add Component

```javascript
// components/ShareModal.jsx

'use client';

import { useState } from 'react';

export default function ShareModal({ isOpen, onClose, onShare, noteId }) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await onShare(noteId, email);
      setEmail('');
      onClose();
    } catch (err) {
      setError(err.response?.data?.error || 'Error sharing note');
    }
  };

  // ... JSX implementation
}
```

## 🧪 Testing

### Manual Testing

1. **CRUD Operations**
   - Create note/bookmark
   - Read/view note/bookmark
   - Update note/bookmark
   - Delete note/bookmark

2. **Search & Filter**
   - Text search
   - Tag filtering
   - Combined search + filter

3. **Edge Cases**
   - Empty fields
   - Invalid URLs
   - Special characters
   - Large text content

4. **Error Handling**
   - Invalid IDs
   - Non-existent resources
   - Network errors
   - Validation failures

### Test Data

```bash
# Create test note
curl -X POST http://localhost:5000/api/notes \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test Note",
    "content": "Test content",
    "tags": ["test"]
  }'

# Create test bookmark
curl -X POST http://localhost:5000/api/bookmarks \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://test.example.com",
    "tags": ["test"]
  }'
```

## 🚀 Deployment

### Backend Deployment (Heroku)

```bash
# Login to Heroku
heroku login

# Create app
heroku create your-app-name

# Set environment variables
heroku config:set MONGODB_URI=your_mongodb_uri -a your-app-name
heroku config:set JWT_SECRET=your_secret -a your-app-name

# Deploy
git push heroku main

# View logs
heroku logs --tail -a your-app-name
```

### Frontend Deployment (Vercel)

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Set environment variable
vercel env add NEXT_PUBLIC_API_URL
# Enter: https://your-app-name.herokuapp.com/api
```

### Environment Variables

**Backend (.env)**
```
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/db
PORT=5000
JWT_SECRET=secret_key
NODE_ENV=production
```

**Frontend (.env.local)**
```
NEXT_PUBLIC_API_URL=https://your-backend.herokuapp.com/api
```

## 📚 Resources

- [Express.js Docs](https://expressjs.com)
- [MongoDB Docs](https://docs.mongodb.com)
- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [React Hooks](https://react.dev/reference/react)

## 🤝 Contributing

1. Create a feature branch
2. Make changes
3. Test thoroughly
4. Submit pull request

## 📝 Coding Standards

- Use consistent naming (camelCase for JS)
- Add comments for complex logic
- Handle errors gracefully
- Validate all inputs
- Use meaningful variable names
- Keep functions focused and small
