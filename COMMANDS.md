# 🚀 Quick Command Reference

Fast lookup for common commands and operations.

## 🎯 Essential Commands

### Backend - First Time Setup
```bash
cd backend
npm install
copy .env.example .env
# Edit .env and update MONGODB_URI
npm run dev
```

### Frontend - First Time Setup
```bash
cd frontend
npm install
npm run dev
```

### Verify Everything Works
```bash
# Test backend
curl http://localhost:5000/api/health

# Open in browser
http://localhost:3000
```

---

## 🔧 Development Commands

### Backend Commands
```bash
# Development server (with auto-reload)
npm run dev

# Production server
npm start

# Install dependencies
npm install

# Install specific package
npm install package-name
```

### Frontend Commands
```bash
# Development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint

# Install dependencies
npm install
```

---

## 🌍 Environment Setup

### Backend .env
```bash
# Copy template
copy .env.example .env

# Edit .env with your values
MONGODB_URI=mongodb://localhost:27017/notes-bookmarks
PORT=5000
JWT_SECRET=your_secret_key
NODE_ENV=development
```

### Frontend .env.local (Optional)
```bash
# Create if needed
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

---

## 📡 API Testing with cURL

### Notes - Create
```bash
curl -X POST http://localhost:5000/api/notes \
  -H "Content-Type: application/json" \
  -d '{"title":"Note","content":"Content","tags":["tag"]}'
```

### Notes - List
```bash
curl http://localhost:5000/api/notes
```

### Notes - Search
```bash
curl "http://localhost:5000/api/notes?q=search"
```

### Notes - Filter
```bash
curl "http://localhost:5000/api/notes?tags=tag1,tag2"
```

### Notes - Get One
```bash
curl http://localhost:5000/api/notes/ID
```

### Notes - Update
```bash
curl -X PUT http://localhost:5000/api/notes/ID \
  -H "Content-Type: application/json" \
  -d '{"title":"New","isFavorite":true}'
```

### Notes - Delete
```bash
curl -X DELETE http://localhost:5000/api/notes/ID
```

### Bookmarks - Create
```bash
curl -X POST http://localhost:5000/api/bookmarks \
  -H "Content-Type: application/json" \
  -d '{"url":"https://example.com","tags":["tag"]}'
```

### Bookmarks - List
```bash
curl http://localhost:5000/api/bookmarks
```

### Bookmarks - Search
```bash
curl "http://localhost:5000/api/bookmarks?q=search"
```

### Bookmarks - Filter
```bash
curl "http://localhost:5000/api/bookmarks?tags=tag"
```

### Bookmarks - Get One
```bash
curl http://localhost:5000/api/bookmarks/ID
```

### Bookmarks - Update
```bash
curl -X PUT http://localhost:5000/api/bookmarks/ID \
  -H "Content-Type: application/json" \
  -d '{"title":"Updated"}'
```

### Bookmarks - Delete
```bash
curl -X DELETE http://localhost:5000/api/bookmarks/ID
```

---

## 🐛 Troubleshooting Commands

### Check if Backend Running
```bash
curl http://localhost:5000/api/health
```

### Check Port Usage (Windows)
```bash
netstat -ano | findstr :5000
netstat -ano | findstr :3000
```

### Kill Process on Port (Windows)
```bash
taskkill /PID PID_NUMBER /F
```

### Check MongoDB Connection
```bash
# Test locally if mongod is running
mongod --version
```

### Clear npm Cache
```bash
npm cache clean --force
```

### Remove node_modules
```bash
rm -rf node_modules
npm install
```

### Check Node Version
```bash
node --version
npm --version
```

---

## 📋 File Navigation

### From Root
```bash
# Backend
cd backend

# Frontend
cd frontend

# Back to root
cd ..
```

### View Files
```bash
# List current folder
dir (Windows) or ls (Mac/Linux)

# Open in editor
code . (VS Code)
```

---

## 📖 Documentation Quick Links

```bash
# View documentation
cat README.md
cat QUICK_START.md
cat DEVELOPMENT.md
cat FEATURES.md

# Open in editor
code README.md
code backend/README.md
code frontend/README.md
```

---

## 🚀 Deployment Commands

### Build Frontend
```bash
cd frontend
npm run build
npm start
```

### Prepare for Deployment
```bash
# Backend
cd backend
npm install --production

# Frontend
cd frontend
npm run build
```

### Check Build Size
```bash
cd frontend
npm run build
# Check .next/static folder size
```

---

## 🔍 Debugging Commands

### View Backend Logs
```bash
# Logs are printed in terminal while running npm run dev
# Look for errors in console output
```

### View Frontend Logs
```bash
# Check browser console (F12)
# Check terminal where npm run dev is running
```

### Check Database
```bash
# If using local MongoDB
mongo
use notes-bookmarks
db.notes.find()
db.bookmarks.find()
```

---

## 📱 Testing Different Viewport Sizes

```bash
# In browser DevTools (F12)
# Click device toolbar (Ctrl+Shift+M)
# Select device size:
# - Mobile: 375x667
# - Tablet: 768x1024
# - Desktop: 1920x1080
```

---

## 🔄 Common Workflows

### Start Fresh Workflow
```bash
# Terminal 1: Backend
cd backend
npm install
npm run dev

# Terminal 2: Frontend (new terminal)
cd frontend
npm install
npm run dev

# Browser
Open http://localhost:3000
```

### Modify Code & Test
```bash
# Backend: Save file, server auto-reloads
# Frontend: Save file, page auto-reloads
# Test in browser or with curl
```

### Add New Feature Workflow
```bash
# 1. Backend: Add controller method
# 2. Backend: Add route
# 3. Frontend: Add helper function
# 4. Frontend: Add component/page
# 5. Test in browser
# 6. Test with cURL/Postman
```

---

## 🛠️ Useful Tools

### cURL
```bash
# Install: Included in most systems
# Usage: curl [options] URL
```

### Postman
```bash
# Download: https://www.postman.com/downloads/
# Import: Postman_Collection.json
```

### VS Code
```bash
# Install: https://code.visualstudio.com/
# Extensions: REST Client, Thunder Client
```

### MongoDB Compass
```bash
# Download: https://www.mongodb.com/products/tools/compass
# Connect to localhost:27017
```

---

## ⌨️ Keyboard Shortcuts

### VS Code
```
Ctrl+` ................... Open terminal
Ctrl+Shift+P ............. Command palette
Ctrl+F ................... Find
Ctrl+H ................... Replace
Ctrl+/ ................... Comment/uncomment
Alt+Up/Down .............. Move line
Ctrl+Shift+K ............. Delete line
```

### Browser DevTools
```
F12 ...................... Open DevTools
Ctrl+Shift+M ............. Toggle mobile view
Ctrl+Shift+Delete ........ Clear cache
Ctrl+Shift+J ............. Developer console
```

---

## 📊 Quick Checks

### Backend Health Check
```bash
curl http://localhost:5000/api/health
# Should return: {"message":"Backend is running"}
```

### Frontend Health Check
```bash
# Open http://localhost:3000 in browser
# Should display home page
# Check browser console for errors
```

### Database Health Check
```bash
# Create a note via API
curl -X POST http://localhost:5000/api/notes \
  -H "Content-Type: application/json" \
  -d '{"title":"Test","content":"Test"}'

# Should return 201 with note data
```

---

## 🎯 Quick Problem Solving

### Backend not starting?
```bash
# Check port usage
netstat -ano | findstr :5000

# Check MongoDB
mongod --version

# Check .env file
cat backend/.env

# Reinstall
cd backend && rm -rf node_modules && npm install
```

### Frontend not loading?
```bash
# Check backend running
curl http://localhost:5000/api/health

# Check .env.local if created
cat frontend/.env.local

# Check port
netstat -ano | findstr :3000

# Reinstall
cd frontend && rm -rf node_modules && npm install
```

### API not working?
```bash
# Test with curl
curl http://localhost:5000/api/notes

# Check backend logs in terminal
# Check browser console (F12)
# Verify MongoDB connection
```

---

## 💡 Pro Tips

### Use Postman Collection
```bash
# Import Postman_Collection.json
# Much easier than typing curl commands
# Can save and organize requests
```

### Use VS Code REST Client
```bash
# Install "REST Client" extension
# Create .rest or .http files
# Send requests directly from editor
```

### Enable Auto-format
```bash
# VS Code: Shift+Alt+F
# Auto-format code while editing
# Makes code cleaner
```

### Use .gitignore
```bash
# Already included in both folders
# Prevents committing node_modules and .env
```

---

## 📞 When Stuck

1. **Check [QUICK_START.md](QUICK_START.md)**
   - Most common issues covered

2. **Check [README.md](README.md#-troubleshooting)**
   - Detailed troubleshooting section

3. **Check Terminal Output**
   - Error messages are usually helpful
   - Scroll up to see full error

4. **Check Browser Console**
   - Frontend errors appear here
   - F12 to open DevTools

5. **Check Documentation**
   - Comprehensive docs included
   - Use INDEX.md to navigate

---

## 🎉 Quick Success Path

```bash
# 1. Setup (2 min)
cd backend && npm install && npm run dev

# 2. Setup (1 min) - new terminal
cd frontend && npm install && npm run dev

# 3. Test (1 min)
Open http://localhost:3000

# 4. Use (unlimited)
Create notes and bookmarks!

# 5. Deploy (varies)
Follow DEVELOPMENT.md
```

---

**Remember**: Most information is in the documentation. When in doubt, check the appropriate README! 📚
