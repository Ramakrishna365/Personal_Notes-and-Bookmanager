# Quick Start Guide

Get the Personal Notes & Bookmark Manager running in 5 minutes!

## 📋 Prerequisites

- Node.js v14+ (v18+ recommended)
- MongoDB running or MongoDB Atlas account
- npm v6+

## ⚡ Quick Setup

### Step 1: Start Backend (2 min)

```bash
# Navigate to backend folder
cd backend

# Copy environment
copy .env.example .env

# Install dependencies
npm install

# Start development server
npm run dev
```

✅ Backend running on `http://localhost:5000`

### Step 2: Start Frontend (1 min)

In a new terminal:

```bash
# Navigate to frontend folder
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

✅ Frontend running on `http://localhost:3000`

### Step 3: Open in Browser

Visit `http://localhost:3000` and start using the app!

## 🔧 Initial Configuration

### MongoDB Setup (Choose One)

**Option A: Local MongoDB**
```
MONGODB_URI=mongodb://localhost:27017/notes-bookmarks
```
Make sure `mongod` is running!

**Option B: MongoDB Atlas (Cloud)**
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/notes-bookmarks
```

Set this in `backend/.env`

## 🧪 Test the App

1. Go to http://localhost:3000
2. Click "New Note" or "New Bookmark"
3. Create a test item
4. Try searching and filtering
5. Test the favorite toggle

## 📚 What's Included

- ✅ Full REST API with CRUD operations
- ✅ React frontend with Next.js
- ✅ Tailwind CSS styling
- ✅ Search and filtering
- ✅ Tags support
- ✅ Favorites
- ✅ Auto-fetch titles for bookmarks
- ✅ MongoDB database
- ✅ Form validation
- ✅ Error handling

## 📖 Full Documentation

- [Main README.md](README.md) - Complete project overview
- [backend/README.md](backend/README.md) - Backend API docs
- [frontend/README.md](frontend/README.md) - Frontend docs

## 🐛 Troubleshooting

**Backend won't start?**
- Check MongoDB is running: `mongod`
- Verify port 5000 is available
- Check `.env` file exists in backend/

**Frontend won't connect to backend?**
- Verify backend is running: http://localhost:5000/api/health
- Check backend/frontend are on correct ports
- Clear browser cache (Ctrl+Shift+Delete)

**Port already in use?**
- Backend: Change PORT in `.env`
- Frontend: Use `npm run dev -- -p 3001`

## 🚀 Next Steps

1. Deploy backend to Heroku/Railway
2. Deploy frontend to Vercel
3. Add user authentication
4. Add more features!

## 💡 API Examples

### Create a Note
```bash
curl -X POST http://localhost:5000/api/notes \
  -H "Content-Type: application/json" \
  -d '{"title":"My Note","content":"Content here","tags":["work"]}'
```

### Create a Bookmark
```bash
curl -X POST http://localhost:5000/api/bookmarks \
  -H "Content-Type: application/json" \
  -d '{"url":"https://github.com","tags":["dev"]}'
```

### Search
```bash
curl http://localhost:5000/api/notes?q=important
curl http://localhost:5000/api/bookmarks?tags=work
```

## 📦 Postman Collection

Import `Postman_Collection.json` into Postman for easy API testing!

## 🎉 You're All Set!

Happy note-taking and bookmarking! 📝🔖
