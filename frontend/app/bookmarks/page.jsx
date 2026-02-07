'use client';

import { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import SearchBar from '@/components/SearchBar';
import BookmarkCard from '@/components/BookmarkCard';
import BookmarkModal from '@/components/BookmarkModal';
import { Plus } from 'lucide-react';
import { fetchBookmarks, createBookmark, deleteBookmark, updateBookmark } from '@/lib/helpers';

export default function BookmarksPage() {
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [tags, setTags] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBookmark, setEditingBookmark] = useState(null);

  useEffect(() => {
    loadBookmarks();
  }, [searchQuery, tags]);

  const loadBookmarks = async () => {
    setLoading(true);
    try {
      const data = await fetchBookmarks(searchQuery, tags);
      setBookmarks(data);
    } catch (error) {
      console.error('Failed to load bookmarks:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveBookmark = async (bookmarkData) => {
    try {
      if (editingBookmark) {
        const updatedBookmark = await updateBookmark(editingBookmark._id, bookmarkData);
        setBookmarks(bookmarks.map((b) => (b._id === editingBookmark._id ? updatedBookmark : b)));
        setEditingBookmark(null);
      } else {
        const newBookmark = await createBookmark(bookmarkData);
        setBookmarks([newBookmark, ...bookmarks]);
      }
    } catch (error) {
      console.error('Error saving bookmark:', error);
      throw error;
    }
  };

  const handleDeleteBookmark = async (id) => {
    if (confirm('Are you sure you want to delete this bookmark?')) {
      try {
        await deleteBookmark(id);
        setBookmarks(bookmarks.filter((b) => b._id !== id));
      } catch (error) {
        console.error('Error deleting bookmark:', error);
      }
    }
  };

  const handleToggleFavorite = async (id, isFavorite) => {
    try {
      const updatedBookmark = await updateBookmark(id, { isFavorite: !isFavorite });
      setBookmarks(bookmarks.map((b) => (b._id === id ? updatedBookmark : b)));
    } catch (error) {
      console.error('Error updating favorite:', error);
    }
  };

  const handleEditBookmark = (bookmark) => {
    setEditingBookmark(bookmark);
    setIsModalOpen(true);
  };

  const handleOpenModal = () => {
    setEditingBookmark(null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingBookmark(null);
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setTags('');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">My Bookmarks</h1>
          <button
            onClick={handleOpenModal}
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 flex items-center gap-2 font-medium"
          >
            <Plus size={20} />
            New Bookmark
          </button>
        </div>

        <SearchBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          tags={tags}
          onTagsChange={setTags}
          onClear={handleClearFilters}
        />

        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-500">Loading bookmarks...</p>
          </div>
        ) : bookmarks.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg">
            <p className="text-gray-500 text-lg">
              {searchQuery || tags
                ? 'No bookmarks found.'
                : 'No bookmarks yet. Save your first bookmark!'}
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bookmarks.map((bookmark) => (
              <BookmarkCard
                key={bookmark._id}
                bookmark={bookmark}
                onDelete={handleDeleteBookmark}
                onEdit={handleEditBookmark}
                onToggleFavorite={handleToggleFavorite}
              />
            ))}
          </div>
        )}
      </main>

      <BookmarkModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveBookmark}
        bookmark={editingBookmark}
      />
    </div>
  );
}
