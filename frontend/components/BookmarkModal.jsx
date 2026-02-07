'use client';

import { useState } from 'react';
import { X } from 'lucide-react';

export default function BookmarkModal({ isOpen, onClose, onSave, bookmark = null }) {
  const [url, setUrl] = useState(bookmark?.url || '');
  const [title, setTitle] = useState(bookmark?.title || '');
  const [description, setDescription] = useState(bookmark?.description || '');
  const [tags, setTags] = useState(bookmark?.tags?.join(', ') || '');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (!url.trim()) {
      setError('URL is required');
      setIsLoading(false);
      return;
    }

    // Basic URL validation
    try {
      new URL(url);
    } catch {
      setError('Please enter a valid URL');
      setIsLoading(false);
      return;
    }

    try {
      const tagArray = tags
        .split(',')
        .map((t) => t.trim())
        .filter((t) => t);

      await onSave({
        url: url.trim(),
        title: title.trim(),
        description: description.trim(),
        tags: tagArray,
      });

      setUrl('');
      setTitle('');
      setDescription('');
      setTags('');
      onClose();
    } catch (err) {
      setError(err.response?.data?.error || 'Error saving bookmark');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">
            {bookmark ? 'Edit Bookmark' : 'New Bookmark'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              URL *
            </label>
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title (auto-fetch if empty)
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Bookmark title"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Bookmark description"
              rows="3"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tags (comma-separated)
            </label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="e.g., reference, dev, news"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex gap-3">
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 font-medium disabled:bg-gray-400"
            >
              {isLoading ? 'Saving...' : bookmark ? 'Update' : 'Create'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 font-medium"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
