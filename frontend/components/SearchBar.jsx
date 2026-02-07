'use client';

import { Search, X } from 'lucide-react';

export default function SearchBar({ searchQuery, onSearchChange, tags, onTagsChange, onClear }) {
  return (
    <div className="bg-white rounded-lg shadow p-4 mb-6 space-y-3">
      <div className="flex gap-2">
        <div className="flex-1 relative">
          <Search size={20} className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search by title, content, or URL..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        {(searchQuery || tags) && (
          <button
            onClick={onClear}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 flex items-center gap-2"
          >
            <X size={18} />
            Clear
          </button>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Filter by Tags
        </label>
        <input
          type="text"
          placeholder="Enter tags separated by comma (e.g., work, important)"
          value={tags}
          onChange={(e) => onTagsChange(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>
  );
}
