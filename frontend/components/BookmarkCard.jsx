'use client';

import { Trash2, ExternalLink, Heart } from 'lucide-react';

export default function BookmarkCard({ bookmark, onDelete, onEdit, onToggleFavorite }) {
  const formattedDate = new Date(bookmark.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return (
    <div className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow p-5 border-l-4 border-green-500">
      <div className="flex justify-between items-start mb-2">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-800">{bookmark.title}</h3>
          <a
            href={bookmark.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-blue-500 hover:text-blue-700 break-all flex items-center gap-1"
          >
            {bookmark.url.substring(0, 50)}...
            <ExternalLink size={14} />
          </a>
        </div>
        <button
          onClick={() => onToggleFavorite(bookmark._id, bookmark.isFavorite)}
          className={`ml-2 transition-colors ${
            bookmark.isFavorite ? 'text-red-500' : 'text-gray-400 hover:text-red-500'
          }`}
        >
          <Heart size={20} fill={bookmark.isFavorite ? 'currentColor' : 'none'} />
        </button>
      </div>

      {bookmark.description && (
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {bookmark.description}
        </p>
      )}

      {bookmark.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-3">
          {bookmark.tags.map((tag) => (
            <span
              key={tag}
              className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full"
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
            onClick={() => onEdit(bookmark)}
            className="text-blue-500 hover:text-blue-700 font-medium"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(bookmark._id)}
            className="text-red-500 hover:text-red-700"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
