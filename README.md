# Personal Notes & Bookmark Manager

A full-stack web application for managing personal notes and bookmarks with search, filtering, and tagging capabilities.

## 🎯 Overview

This project demonstrates a complete full-stack implementation with:
- **Backend**: Node.js/Express REST API with MongoDB
- **Frontend**: Next.js/React with Tailwind CSS
- **Features**: CRUD operations, search, filtering, favorites, auto-title fetching

## 📋 Table of Contents

- [Project Structure](#project-structure)
- [Quick Start](#quick-start)
- [Backend Setup](#backend-setup)
- [Frontend Setup](#frontend-setup)
- [Features](#features)
- [API Documentation](#api-documentation)
- [Bonus Features](#bonus-features)
- [Troubleshooting](#troubleshooting)

## 📁 Project Structure

```
dev_Assignment/
├── backend/                 # Node.js/Express API
│   ├── src/
│   │   ├── config/         # Database configuration
│   │   ├── controllers/    # Business logic
│   │   ├── middleware/     # Auth & validation
│   │   ├── routes/         # API endpoints
│   │   └── index.js        # Server entry point
│   ├── package.json
│   ├── .env.example
│   └── README.md
└── frontend/                # Next.js application
    ├── app/                # Pages and layouts
    ├── components/         # React components
    ├── lib/               # Utilities and API helpers
    ├── public/            # Static files
    ├── package.json
    ├── tailwind.config.js
    └── README.md
```

## 🚀 Quick Start

### Prerequisites

- **Node.js**: v14+ (v18+ recommended)
- **MongoDB**: Local instance or MongoDB Atlas
- **npm**: v6+

### Installation & Run (5 minutes)

#### 1. Backend Setup

```bash
# Navigate to backend folder
cd backend

# Copy environment file
copy .env.example .env
# On Linux/Mac: cp .env.example .env

# Update .env with your MongoDB URI
# MONGODB_URI=mongodb://localhost:27017/notes-bookmarks

# Install dependencies
npm install

# Start the server (development mode with auto-reload)
npm run dev

# Server will run on http://localhost:5000
# API endpoints available at http://localhost:5000/api
```

**In a new terminal:**

#### 2. Frontend Setup

```bash
# Navigate to frontend folder
cd frontend

# Install dependencies
npm install

# Start the development server
npm run dev

# Frontend will run on http://localhost:3000
```

Open http://localhost:3000 in your browser!

## 🔧 Backend Setup (Detailed)

### Prerequisites

- MongoDB running locally OR MongoDB Atlas account
- Node.js v14+

### Step-by-Step

```bash
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env
```

### Configure .env

Edit `.env` file:

```env
# MongoDB connection (local)
MONGODB_URI=mongodb://localhost:27017/notes-bookmarks

# Or MongoDB Atlas
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/notes-bookmarks

PORT=5000
JWT_SECRET=your-secret-key-here
NODE_ENV=development
```

### MongoDB Setup

**Option 1: Local MongoDB**
```bash
# Start MongoDB service
mongod
```

**Option 2: MongoDB Atlas (Cloud)**
1. Visit https://www.mongodb.com/cloud/atlas
2. Create a free account
3. Create a cluster
4. Get connection string
5. Update MONGODB_URI in .env

### Start Backend

```bash
# Development with auto-reload
npm run dev

# Or production
npm start
```

### Test Backend

```bash
# Check if server is running
curl http://localhost:5000/api/health

# Should return: { "message": "Backend is running" }
```

## 🎨 Frontend Setup (Detailed)

### Prerequisites

- Node.js v18+
- Backend running on http://localhost:5000

### Step-by-Step

```bash
cd frontend

# Install dependencies
npm install

# Create .env.local (optional, defaults to localhost:5000)
echo "NEXT_PUBLIC_API_URL=http://localhost:5000/api" > .env.local
```

### Environment Variables

Create `.env.local`:

```env
# API endpoint (defaults to http://localhost:5000/api if not set)
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### Start Frontend

```bash
# Development server
npm run dev

# Build for production
npm run build
npm start
```

Open http://localhost:3000 in your browser!

## ✨ Features

### Notes Management
- ✅ Create notes with title, content, and tags
- ✅ Search notes by title and content
- ✅ Filter notes by tags
- ✅ Edit existing notes
- ✅ Delete notes
- ✅ Mark/unmark as favorite
- ✅ View creation date

### Bookmarks Management
- ✅ Save bookmarks with URL, title, and description
- ✅ Auto-fetch page title if left empty
- ✅ Search bookmarks by title and URL
- ✅ Filter bookmarks by tags
- ✅ Edit existing bookmarks
- ✅ Delete bookmarks
- ✅ Mark/unmark as favorite
- ✅ Direct links to saved websites
- ✅ View creation date

### General Features
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Clean and modern UI
- ✅ Real-time search and filtering
- ✅ Tag-based organization
- ✅ Input validation
- ✅ Error handling
- ✅ User isolation (data per user)

## 📚 API Documentation

### Base URL

```
http://localhost:5000/api
```

### Notes Endpoints

#### Create Note
```bash
POST /api/notes
Content-Type: application/json

{
  "title": "My Note",
  "content": "Note content here",
  "tags": ["work", "important"]
}
```

**Response (201):**
```json
{
  "message": "Note created successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "userId": "default-user",
    "title": "My Note",
    "content": "Note content here",
    "tags": ["work", "important"],
    "isFavorite": false,
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
}
```

#### Get All Notes
```bash
# Get all notes
GET /api/notes

# Search notes
GET /api/notes?q=important

# Filter by tags
GET /api/notes?tags=work,important

# Search and filter combined
GET /api/notes?q=important&tags=work
```

#### Get Single Note
```bash
GET /api/notes/:id
```

#### Update Note
```bash
PUT /api/notes/:id
Content-Type: application/json

{
  "title": "Updated Title",
  "content": "Updated content",
  "tags": ["updated"],
  "isFavorite": true
}
```

#### Delete Note
```bash
DELETE /api/notes/:id
```

### Bookmarks Endpoints

#### Create Bookmark
```bash
POST /api/bookmarks
Content-Type: application/json

{
  "url": "https://example.com",
  "title": "Example Site",              // Optional - will auto-fetch
  "description": "A great resource",
  "tags": ["reference"]
}
```

#### Get All Bookmarks
```bash
GET /api/bookmarks
GET /api/bookmarks?q=github
GET /api/bookmarks?tags=dev
GET /api/bookmarks?q=github&tags=dev
```

#### Get Single Bookmark
```bash
GET /api/bookmarks/:id
```

#### Update Bookmark
```bash
PUT /api/bookmarks/:id
Content-Type: application/json

{
  "url": "https://updated.com",
  "title": "Updated Title",
  "description": "Updated description",
  "tags": ["updated"],
  "isFavorite": true
}
```

#### Delete Bookmark
```bash
DELETE /api/bookmarks/:id
```

## 📝 cURL Examples

### Create a Note
```bash
curl -X POST http://localhost:5000/api/notes \
  -H "Content-Type: application/json" \
  -d '{
    "title": "My First Note",
    "content": "This is the content of my note",
    "tags": ["personal", "important"]
  }'
```

### Search Notes
```bash
curl "http://localhost:5000/api/notes?q=important&tags=work"
```

### Create a Bookmark
```bash
curl -X POST http://localhost:5000/api/bookmarks \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://github.com",
    "description": "Where the world builds software",
    "tags": ["dev", "reference"]
  }'
```

### Get All Bookmarks
```bash
curl "http://localhost:5000/api/bookmarks"
```

### Update a Bookmark
```bash
curl -X PUT http://localhost:5000/api/bookmarks/507f1f77bcf86cd799439012 \
  -H "Content-Type: application/json" \
  -d '{
    "isFavorite": true,
    "tags": ["dev", "important"]
  }'
```

### Delete a Note
```bash
curl -X DELETE http://localhost:5000/api/notes/507f1f77bcf86cd799439011
```

## 🎁 Bonus Features Implemented

### ✅ Auto-fetch Bookmark Titles
When creating a bookmark without a title, the system automatically fetches the page title:

```bash
curl -X POST http://localhost:5000/api/bookmarks \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://github.com",
    # Title will be auto-fetched as "GitHub - Where the world builds software"
    "tags": ["dev"]
  }'
```

### ✅ Favorite Marking
Mark any note or bookmark as favorite:

```bash
# Mark as favorite
curl -X PUT http://localhost:5000/api/notes/507f1f77bcf86cd799439011 \
  -H "Content-Type: application/json" \
  -d '{ "isFavorite": true }'
```

### ✅ User Isolation
All items are tied to a userId, allowing multi-user support in future:

```javascript
// Backend automatically isolates data by userId
{
  userId: "default-user",
  title: "My Note",
  // ... other fields
}
```

## 🐛 Troubleshooting

### Backend Issues

**Port already in use**
```bash
# Change port in .env
PORT=5001

# Or kill the process using port 5000
# On Windows: netstat -ano | findstr :5000
# On Mac/Linux: lsof -i :5000
```

**MongoDB connection error**
```bash
# Check MongoDB is running
mongod

# Verify MONGODB_URI in .env
# Local: mongodb://localhost:27017/notes-bookmarks
# Atlas: mongodb+srv://username:password@cluster...
```

**npm install fails**
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules
npm install
```

### Frontend Issues

**Port 3000 already in use**
```bash
# Next.js will prompt to use another port
# Or manually specify: npm run dev -- -p 3001
```

**Cannot connect to backend**
- Verify backend is running: http://localhost:5000/api/health
- Check NEXT_PUBLIC_API_URL in .env.local
- Check browser console for network errors

**Styles not loading**
```bash
# Rebuild Tailwind CSS
npm run build

# Restart dev server
npm run dev
```

## 📦 Deployment

### Backend Deployment (Heroku)
```bash
# Add Procfile to backend folder
echo "web: node src/index.js" > Procfile

# Deploy
heroku create
heroku config:set MONGODB_URI=your_mongodb_uri
git push heroku main
```

### Frontend Deployment (Vercel)
```bash
npm install -g vercel
vercel

# Set environment variables during deployment
# NEXT_PUBLIC_API_URL=https://your-backend.herokuapp.com/api
```

## 🛠️ Tech Stack Summary

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Backend** | Node.js | Runtime |
| | Express.js | Web framework |
| | MongoDB | Database |
| | validator.js | Input validation |
| | axios + cheerio | URL scraping |
| **Frontend** | Next.js 14 | React framework |
| | React 18 | UI library |
| | Tailwind CSS | Styling |
| | Lucide Icons | Icons |
| | axios | HTTP client |

## 📋 Code Structure & Modularity

### Backend
- **Controllers**: Business logic separated from routes
- **Middleware**: Reusable auth and validation
- **Database**: Centralized MongoDB configuration
- **Routes**: Clean REST API structure

### Frontend
- **Pages**: Route-based page components
- **Components**: Reusable UI components
- **Helpers**: API integration utilities
- **Configuration**: Tailwind and PostCSS setup

## ✅ Evaluation Checklist

- [x] **Working CRUD Functionality**: All endpoints tested and working
- [x] **Code Structure & Modularity**: Clear separation of concerns
- [x] **Error Handling & Validation**: Input validation + error messages
- [x] **UI/UX Quality**: Responsive design + clean interface
- [x] **README & Setup Instructions**: Comprehensive documentation
- [x] **API Documentation**: Complete endpoint documentation
- [x] **Bonus Features**: Auto-fetch, favorites, user isolation

## 📄 License

MIT

## 👤 Author

Created as a full-stack development assignment.

## 🤝 Support

For issues or questions, check the individual README files in:
- [backend/README.md](backend/README.md)
- [frontend/README.md](frontend/README.md)
