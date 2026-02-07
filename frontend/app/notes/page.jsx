'use client';

import { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import SearchBar from '@/components/SearchBar';
import NoteCard from '@/components/NoteCard';
import NoteModal from '@/components/NoteModal';
import { Plus } from 'lucide-react';
import { fetchNotes, createNote, deleteNote, updateNote } from '@/lib/helpers';

export default function NotesPage() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [tags, setTags] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingNote, setEditingNote] = useState(null);

  useEffect(() => {
    loadNotes();
  }, [searchQuery, tags]);

  const loadNotes = async () => {
    setLoading(true);
    try {
      const data = await fetchNotes(searchQuery, tags);
      setNotes(data);
    } catch (error) {
      console.error('Failed to load notes:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveNote = async (noteData) => {
    try {
      if (editingNote) {
        const updatedNote = await updateNote(editingNote._id, noteData);
        setNotes(notes.map((n) => (n._id === editingNote._id ? updatedNote : n)));
        setEditingNote(null);
      } else {
        const newNote = await createNote(noteData);
        setNotes([newNote, ...notes]);
      }
    } catch (error) {
      console.error('Error saving note:', error);
      throw error;
    }
  };

  const handleDeleteNote = async (id) => {
    if (confirm('Are you sure you want to delete this note?')) {
      try {
        await deleteNote(id);
        setNotes(notes.filter((n) => n._id !== id));
      } catch (error) {
        console.error('Error deleting note:', error);
      }
    }
  };

  const handleToggleFavorite = async (id, isFavorite) => {
    try {
      const updatedNote = await updateNote(id, { isFavorite: !isFavorite });
      setNotes(notes.map((n) => (n._id === id ? updatedNote : n)));
    } catch (error) {
      console.error('Error updating favorite:', error);
    }
  };

  const handleEditNote = (note) => {
    setEditingNote(note);
    setIsModalOpen(true);
  };

  const handleOpenModal = () => {
    setEditingNote(null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingNote(null);
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
          <h1 className="text-3xl font-bold text-gray-800">My Notes</h1>
          <button
            onClick={handleOpenModal}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 flex items-center gap-2 font-medium"
          >
            <Plus size={20} />
            New Note
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
            <p className="text-gray-500">Loading notes...</p>
          </div>
        ) : notes.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg">
            <p className="text-gray-500 text-lg">
              {searchQuery || tags ? 'No notes found.' : 'No notes yet. Create your first note!'}
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map((note) => (
              <NoteCard
                key={note._id}
                note={note}
                onDelete={handleDeleteNote}
                onEdit={handleEditNote}
                onToggleFavorite={handleToggleFavorite}
              />
            ))}
          </div>
        )}
      </main>

      <NoteModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveNote}
        note={editingNote}
      />
    </div>
  );
}
