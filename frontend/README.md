# Frontend - Personal Notes & Bookmark Manager

Next.js + React + Tailwind CSS

## Features

- ✅ Responsive UI with Tailwind CSS
- ✅ Clean, modern design
- ✅ Real-time search and filtering
- ✅ Create, edit, delete notes and bookmarks
- ✅ Mark items as favorites
- ✅ Tag-based filtering
- ✅ Automatic URL title fetching
- ✅ Mobile-friendly

## Tech Stack

- **Framework**: Next.js 14
- **UI Library**: React 18
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios
- **Icons**: Lucide React

## Project Structure

```
frontend/
├── app/
│   ├── layout.jsx           # Root layout
│   ├── page.jsx             # Home page
│   ├── globals.css          # Global styles
│   ├── notes/
│   │   └── page.jsx         # Notes page
│   └── bookmarks/
│       └── page.jsx         # Bookmarks page
├── components/
│   ├── Navigation.jsx       # Navigation bar
│   ├── SearchBar.jsx        # Search & filter component
│   ├── NoteCard.jsx         # Note card component
│   ├── BookmarkCard.jsx     # Bookmark card component
│   ├── NoteModal.jsx        # Note creation/edit modal
│   └── BookmarkModal.jsx    # Bookmark creation/edit modal
├── lib/
│   ├── api.js               # API configuration
│   └── helpers.js           # Helper functions for API calls
├── public/                  # Static assets
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── README.md
```

## Installation

### Prerequisites

- Node.js (v18+)
- Backend server running on `http://localhost:5000`

### Setup Steps

1. **Navigate to the frontend folder**

```bash
cd frontend
```

2. **Install dependencies**

```bash
npm install
```

3. **Create `.env.local` file (optional)**

```bash
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

If not set, defaults to `http://localhost:5000/api`

4. **Start the development server**

```bash
npm run dev
```

The frontend will run on `http://localhost:3000`

5. **Build for production**

```bash
npm run build
npm start
```

## Configuration

The API base URL can be configured in [lib/api.js](lib/api.js):

```javascript
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
```

## Pages

### Home Page (`/`)
- Welcome screen with quick links to Notes and Bookmarks
- Feature overview
- Navigation to main sections

### Notes Page (`/notes`)
- List all user notes
- Search and filter notes by text and tags
- Create new notes with modal
- Edit existing notes
- Delete notes
- Mark/unmark notes as favorites
- Display tags for each note

### Bookmarks Page (`/bookmarks`)
- List all user bookmarks
- Search and filter bookmarks by text and tags
- Create new bookmarks with modal
- Auto-fetch page titles from URLs
- Edit existing bookmarks
- Delete bookmarks
- Mark/unmark bookmarks as favorites
- Display tags and open URLs in new tab

## Components

### Navigation
Header navigation with links to Notes and Bookmarks pages.

### SearchBar
- Text search input
- Tag filter input
- Clear filters button
- Responsive design

### NoteCard
- Display note title and preview
- Show tags
- Creation date
- Edit and delete buttons
- Favorite toggle

### BookmarkCard
- Display bookmark title
- Show clickable URL
- Description preview
- Show tags
- Creation date
- Edit and delete buttons
- Favorite toggle
- External link icon

### NoteModal
- Create/edit note modal
- Title input
- Content textarea
- Tag input (comma-separated)
- Form validation
- Error messages

### BookmarkModal
- Create/edit bookmark modal
- URL input with validation
- Optional title (auto-fetches if empty)
- Description textarea
- Tag input (comma-separated)
- Form validation
- Error messages

## Styling

The application uses Tailwind CSS with custom configurations:

- **Colors**: Blue for notes, green for bookmarks, with semantic colors for actions
- **Responsive**: Mobile-first design with `md:` and `lg:` breakpoints
- **Dark Mode**: Easily extensible for dark mode support
- **Spacing**: Consistent padding and margins throughout

## API Integration

The frontend communicates with the backend via [lib/helpers.js](lib/helpers.js):

```javascript
// Fetch notes
const notes = await fetchNotes(searchQuery, tags);

// Create note
const newNote = await createNote({ title, content, tags });

// Fetch bookmarks
const bookmarks = await fetchBookmarks(searchQuery, tags);

// Create bookmark
const newBookmark = await createBookmark({ url, title, description, tags });
```

## State Management

The application uses React's `useState` and `useEffect` hooks for state management:

- `notes` / `bookmarks`: Array of items from API
- `loading`: Loading state during API calls
- `searchQuery`: Current search text
- `tags`: Current tag filter
- `isModalOpen`: Modal visibility state
- `editingNote` / `editingBookmark`: Currently editing item

## Error Handling

- API errors are caught and logged
- User-friendly error messages in modals
- Loading states to prevent UI conflicts
- Validation before submitting forms

## Performance Optimizations

- **Code Splitting**: Next.js automatically splits code by page
- **Image Optimization**: Lucide icons are lightweight SVGs
- **CSS**: Tailwind's purging removes unused styles
- **Client-side Rendering**: Uses `'use client'` for interactive components
- **Memoization**: Cards and modals are optimized components

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

## Future Enhancements

- User authentication UI
- Dark mode
- Export/Import functionality
- Bulk operations
- Keyboard shortcuts
- PWA features
- Offline support
- Advanced search filters
- Collections/folders
