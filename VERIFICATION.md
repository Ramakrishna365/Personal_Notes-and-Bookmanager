# Installation & Verification Checklist

Use this checklist to verify your installation is complete and working.

## ✅ Backend Installation

### Step 1: Files & Folders
- [ ] `backend/` folder exists
- [ ] `backend/package.json` exists
- [ ] `backend/.env.example` exists
- [ ] `backend/src/` folder with config, middleware, controllers, routes
- [ ] `backend/README.md` exists

### Step 2: Dependencies
```bash
cd backend
npm install
```
- [ ] `npm install` completes successfully
- [ ] `node_modules/` folder created
- [ ] `package-lock.json` created

### Step 3: Configuration
```bash
copy .env.example .env
```
- [ ] `.env` file created
- [ ] Updated MONGODB_URI with your MongoDB connection
- [ ] MongoDB running and accessible

### Step 4: Start Backend
```bash
npm run dev
```
- [ ] Server starts without errors
- [ ] Shows "Connected to MongoDB"
- [ ] Shows "Server running on http://localhost:5000"

### Step 5: Verify Backend
```bash
curl http://localhost:5000/api/health
```
- [ ] Returns: `{"message":"Backend is running"}`
- [ ] No connection errors

## ✅ Frontend Installation

### Step 1: Files & Folders
- [ ] `frontend/` folder exists
- [ ] `frontend/package.json` exists
- [ ] `frontend/app/`, `frontend/components/`, `frontend/lib/` folders
- [ ] `frontend/tailwind.config.js` exists
- [ ] `frontend/README.md` exists

### Step 2: Dependencies
```bash
cd frontend
npm install
```
- [ ] `npm install` completes successfully
- [ ] `node_modules/` folder created
- [ ] `package-lock.json` created

### Step 3: Start Frontend
```bash
npm run dev
```
- [ ] Development server starts
- [ ] Shows "Local: http://localhost:3000"
- [ ] No TypeScript or build errors

### Step 4: Open in Browser
- [ ] http://localhost:3000 loads
- [ ] Home page displays
- [ ] Navigation bar visible
- [ ] No console errors

## ✅ Feature Verification

### Notes Feature
1. Navigate to /notes
   - [ ] Page loads
   - [ ] "New Note" button visible
   - [ ] Empty state message displays

2. Create a note
   - [ ] Click "New Note"
   - [ ] Modal appears
   - [ ] Fill title: "Test Note"
   - [ ] Fill content: "This is a test"
   - [ ] Add tags: "test, demo"
   - [ ] Click "Create"
   - [ ] Note appears in list
   - [ ] No error messages

3. Search notes
   - [ ] Type "test" in search
   - [ ] Note appears in results
   - [ ] Clear search
   - [ ] All notes return

4. Filter by tags
   - [ ] Enter "test" in tag filter
   - [ ] Note appears
   - [ ] Enter "demo" in tag filter
   - [ ] Note still appears
   - [ ] Enter "nonexistent" in tag filter
   - [ ] No results appear

5. Edit note
   - [ ] Click "Edit" on note
   - [ ] Modal opens with current data
   - [ ] Change title to "Updated Note"
   - [ ] Click "Update"
   - [ ] Note title updated in list

6. Mark as favorite
   - [ ] Click heart icon on note
   - [ ] Heart fills with red
   - [ ] Click heart again
   - [ ] Heart unfills

7. Delete note
   - [ ] Click delete icon
   - [ ] Confirm deletion
   - [ ] Note removed from list

### Bookmarks Feature
1. Navigate to /bookmarks
   - [ ] Page loads
   - [ ] "New Bookmark" button visible
   - [ ] Empty state message displays

2. Create a bookmark
   - [ ] Click "New Bookmark"
   - [ ] Modal appears
   - [ ] Fill URL: "https://github.com"
   - [ ] Leave title empty (auto-fetch test)
   - [ ] Fill description: "GitHub"
   - [ ] Add tags: "dev"
   - [ ] Click "Create"
   - [ ] Bookmark appears in list
   - [ ] Title auto-fetched (should be something from GitHub)
   - [ ] No error messages

3. Search bookmarks
   - [ ] Type "github" in search
   - [ ] Bookmark appears in results
   - [ ] Clear search
   - [ ] All bookmarks return

4. Filter by tags
   - [ ] Enter "dev" in tag filter
   - [ ] Bookmark appears
   - [ ] Clear filter

5. Open bookmark URL
   - [ ] Click URL or "Edit" link
   - [ ] Should open GitHub in new tab (when clicking the URL)

6. Edit bookmark
   - [ ] Click "Edit" on bookmark
   - [ ] Modal opens with current data
   - [ ] Change title
   - [ ] Click "Update"
   - [ ] Changes reflected in list

7. Mark as favorite
   - [ ] Click heart icon
   - [ ] Heart fills with red

8. Delete bookmark
   - [ ] Click delete icon
   - [ ] Confirm deletion
   - [ ] Bookmark removed from list

## 🔗 API Verification (Using Postman or cURL)

### Health Check
```bash
curl http://localhost:5000/api/health
```
- [ ] Returns 200 OK
- [ ] Message: "Backend is running"

### Create Note
```bash
curl -X POST http://localhost:5000/api/notes \
  -H "Content-Type: application/json" \
  -d '{"title":"Test","content":"Test content","tags":["test"]}'
```
- [ ] Returns 201 Created
- [ ] Response includes note data
- [ ] _id is present

### Get All Notes
```bash
curl http://localhost:5000/api/notes
```
- [ ] Returns 200 OK
- [ ] Returns array of notes
- [ ] Response includes data and message

### Create Bookmark
```bash
curl -X POST http://localhost:5000/api/bookmarks \
  -H "Content-Type: application/json" \
  -d '{"url":"https://github.com","tags":["dev"]}'
```
- [ ] Returns 201 Created
- [ ] Title auto-fetched
- [ ] Response includes bookmark data

### Search Notes
```bash
curl "http://localhost:5000/api/notes?q=test"
```
- [ ] Returns 200 OK
- [ ] Returns matching notes

### Filter by Tags
```bash
curl "http://localhost:5000/api/bookmarks?tags=dev"
```
- [ ] Returns 200 OK
- [ ] Returns bookmarks with tag

## 📱 Responsive Design Check

### Mobile View (320px width)
- [ ] Navigation bar readable
- [ ] Content stacks vertically
- [ ] Buttons are large enough
- [ ] Modal appears properly
- [ ] No horizontal scroll

### Tablet View (768px width)
- [ ] 2-column layout for cards
- [ ] Navigation bar still accessible
- [ ] Forms readable

### Desktop View (1024px width)
- [ ] 3-column layout for cards
- [ ] Full width utilized
- [ ] All features visible

## 🐛 Error Handling Tests

### Invalid Input
```bash
# Create note without title (should fail)
curl -X POST http://localhost:5000/api/notes \
  -H "Content-Type: application/json" \
  -d '{"content":"No title"}'
```
- [ ] Returns 400 Bad Request
- [ ] Error message: "Title is required..."

### Invalid URL
```bash
# Create bookmark with invalid URL
curl -X POST http://localhost:5000/api/bookmarks \
  -H "Content-Type: application/json" \
  -d '{"url":"not-a-url"}'
```
- [ ] Returns 400 Bad Request
- [ ] Error message: "Valid URL is required"

### Non-existent Resource
```bash
curl http://localhost:5000/api/notes/invalid-id
```
- [ ] Returns 404 Not Found
- [ ] Error message: "Note not found"

## 📊 Performance Checks

- [ ] Page load time < 2 seconds
- [ ] Search completes < 500ms
- [ ] Create note/bookmark < 1 second
- [ ] No console errors
- [ ] No network errors
- [ ] No memory leaks

## 🎉 Final Verification

- [ ] Backend and frontend both running
- [ ] Can create notes
- [ ] Can create bookmarks
- [ ] Can search and filter
- [ ] Can edit items
- [ ] Can delete items
- [ ] Can mark favorites
- [ ] All error messages display properly
- [ ] UI is responsive
- [ ] No console errors
- [ ] README files are present
- [ ] All documentation is complete

## ✅ Installation Complete!

If all checkboxes are marked, your installation is complete and working correctly!

### Next Steps
1. Create some sample notes and bookmarks
2. Test all features
3. Read the documentation in README.md
4. Explore the code structure
5. Consider deploying to production

### Troubleshooting

If something doesn't work:
1. Check [README.md](README.md) for setup instructions
2. Check [QUICK_START.md](QUICK_START.md) for common issues
3. Check [backend/README.md](backend/README.md) for backend errors
4. Check [frontend/README.md](frontend/README.md) for frontend errors
5. Check [DEVELOPMENT.md](DEVELOPMENT.md) for architecture info

### Support Resources

- **Postman Collection**: [Postman_Collection.json](Postman_Collection.json)
- **API Documentation**: [backend/README.md](backend/README.md#api-documentation)
- **Setup Instructions**: [QUICK_START.md](QUICK_START.md)
- **Development Guide**: [DEVELOPMENT.md](DEVELOPMENT.md)
- **Feature List**: [FEATURES.md](FEATURES.md)
