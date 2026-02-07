'use client';

import { Trash2, ExternalLink, Heart } from 'lucide-react';

export default function NoteCard({ note, onDelete, onEdit, onToggleFavorite }) {
  const formattedDate = new Date(note.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return (
    <div className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow p-5 border-l-4 border-blue-500">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-lg font-semibold text-gray-800 flex-1">{note.title}</h3>
        <button
          onClick={() => onToggleFavorite(note._id, note.isFavorite)}
          className={`ml-2 transition-colors ${
            note.isFavorite ? 'text-red-500' : 'text-gray-400 hover:text-red-500'
          }`}
        >
          <Heart size={20} fill={note.isFavorite ? 'currentColor' : 'none'} />
        </button>
      </div>

      <p className="text-gray-600 text-sm mb-3 line-clamp-3">{note.content}</p>

      {note.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-3">
          {note.tags.map((tag) => (
            <span
              key={tag}
              className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      <div className="flex justify-between items-center text-sm text-gray-500">
        <span>{formattedDate}</span>
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(note)}
            className="text-blue-500 hover:text-blue-700 font-medium"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(note._id)}
            className="text-red-500 hover:text-red-700"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
