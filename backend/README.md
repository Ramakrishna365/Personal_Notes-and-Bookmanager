# Backend - Personal Notes & Bookmark Manager

Node.js + Express + MongoDB REST API

## Features

- ✅ Complete CRUD operations for Notes and Bookmarks
- ✅ Search and filter by tags
- ✅ Text search functionality
- ✅ Favorite bookmarking
- ✅ Auto-fetch bookmark titles from URLs
- ✅ Input validation and error handling
- ✅ User isolation (basic authentication)
- ✅ Proper HTTP status codes

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB
- **Validation**: validator.js
- **URL Title Fetching**: axios + cheerio
- **Authentication**: JWT (optional)

## Project Structure

```
backend/
├── src/
│   ├── config/
│   │   └── database.js          # MongoDB connection & setup
│   ├── middleware/
│   │   ├── auth.js              # Authentication middleware
│   │   └── validation.js        # Request validation middleware
│   ├── controllers/
│   │   ├── notesController.js   # Notes business logic
│   │   └── bookmarksController.js # Bookmarks business logic
│   ├── routes/
│   │   ├── notes.js             # Notes API routes
│   │   └── bookmarks.js         # Bookmarks API routes
│   └── index.js                 # Main server file
├── package.json
├── .env.example
├── .gitignore
└── README.md
```

## Installation

### Prerequisites

- Node.js (v14+)
- MongoDB running locally or MongoDB Atlas URL

### Setup Steps

1. **Clone and navigate to the backend folder**

```bash
cd backend
```

2. **Install dependencies**

```bash
npm install
```

3. **Create `.env` file**

```bash
cp .env.example .env
```

4. **Update `.env` with your configuration**

```env
MONGODB_URI=mongodb://localhost:27017/notes-bookmarks
PORT=5000
JWT_SECRET=your_jwt_secret_key_here
NODE_ENV=development
```

5. **Start the server**

```bash
# Development with auto-reload
npm run dev

# Production
npm start
```

The server will run on `http://localhost:5000`

## API Documentation

### Base URL
```
http://localhost:5000/api
```

### Notes Endpoints

#### Create Note
```
POST /api/notes
Content-Type: application/json

{
  "title": "My Note",
  "content": "This is my note content",
  "tags": ["work", "important"]
}
```

**Response (201)**
```json
{
  "message": "Note created successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "userId": "default-user",
    "title": "My Note",
    "content": "This is my note content",
    "tags": ["work", "important"],
    "isFavorite": false,
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
}
```

#### Get All Notes
```
GET /api/notes
GET /api/notes?q=searchTerm
GET /api/notes?tags=work,important
GET /api/notes?q=searchTerm&tags=work
```

**Response (200)**
```json
{
  "message": "Notes retrieved successfully",
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "title": "My Note",
      "content": "This is my note content",
      "tags": ["work"],
      "isFavorite": false,
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T10:30:00.000Z"
    }
  ]
}
```

#### Get Note by ID
```
GET /api/notes/:id
```

**Response (200)**
```json
{
  "message": "Note retrieved successfully",
  "data": { /* note object */ }
}
```

#### Update Note
```
PUT /api/notes/:id
Content-Type: application/json

{
  "title": "Updated Title",
  "content": "Updated content",
  "tags": ["updated"],
  "isFavorite": true
}
```

**Response (200)**
```json
{
  "message": "Note updated successfully",
  "data": { /* updated note object */ }
}
```

#### Delete Note
```
DELETE /api/notes/:id
```

**Response (200)**
```json
{ "message": "Note deleted successfully" }
```

### Bookmarks Endpoints

#### Create Bookmark
```
POST /api/bookmarks
Content-Type: application/json

{
  "url": "https://example.com",
  "title": "Example Site",        // Optional - will be auto-fetched if empty
  "description": "A great resource",
  "tags": ["reference"]
}
```

**Response (201)**
```json
{
  "message": "Bookmark created successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439012",
    "userId": "default-user",
    "url": "https://example.com",
    "title": "Example Site",
    "description": "A great resource",
    "tags": ["reference"],
    "isFavorite": false,
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
}
```

#### Get All Bookmarks
```
GET /api/bookmarks
GET /api/bookmarks?q=searchTerm
GET /api/bookmarks?tags=reference
GET /api/bookmarks?q=searchTerm&tags=reference
```

**Response (200)**
```json
{
  "message": "Bookmarks retrieved successfully",
  "data": [ /* bookmark objects */ ]
}
```

#### Get Bookmark by ID
```
GET /api/bookmarks/:id
```

#### Update Bookmark
```
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
```
DELETE /api/bookmarks/:id
```

## Error Responses

### 400 Bad Request
```json
{
  "error": "Title is required and must be a non-empty string"
}
```

### 404 Not Found
```json
{
  "error": "Note not found"
}
```

### 500 Internal Server Error
```json
{
  "error": "Internal server error"
}
```

## cURL Examples

### Create a Note
```bash
curl -X POST http://localhost:5000/api/notes \
  -H "Content-Type: application/json" \
  -d '{
    "title": "My First Note",
    "content": "This is the content",
    "tags": ["personal"]
  }'
```

### Search Notes
```bash
curl http://localhost:5000/api/notes?q=important&tags=work
```

### Create a Bookmark
```bash
curl -X POST http://localhost:5000/api/bookmarks \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://github.com",
    "description": "GitHub - Where the world builds software",
    "tags": ["dev"]
  }'
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

## Validation Rules

### Notes
- **title**: Required, non-empty string
- **content**: Required, non-empty string
- **tags**: Optional array of strings
- **isFavorite**: Optional boolean

### Bookmarks
- **url**: Required, valid URL format
- **title**: Optional string (auto-fetched from URL if empty)
- **description**: Optional string
- **tags**: Optional array of strings
- **isFavorite**: Optional boolean

## Features Implemented

✅ **CRUD Operations**
- Create, Read, Update, Delete for both Notes and Bookmarks

✅ **Search & Filter**
- Text search on title/content for notes
- Text search on title/URL for bookmarks
- Filter by tags

✅ **Data Validation**
- URL validation for bookmarks
- Required field validation
- Type checking

✅ **Error Handling**
- Proper HTTP status codes
- Descriptive error messages
- Input validation

✅ **Bonus Features**
- Auto-fetch bookmark titles from URLs
- Mark items as favorites
- User isolation (all items tied to userId)

## Future Enhancements

- JWT authentication implementation
- Rate limiting
- Pagination for large result sets
- Bulk operations
- Export/Import functionality
- Database transaction support for complex operations
