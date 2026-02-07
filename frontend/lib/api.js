export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export const apiClient = {
  // Notes API
  notes: {
    create: (data) => ({
      method: 'POST',
      url: `${API_BASE_URL}/notes`,
      data,
    }),
    getAll: (query = '') => ({
      method: 'GET',
      url: `${API_BASE_URL}/notes${query}`,
    }),
    getById: (id) => ({
      method: 'GET',
      url: `${API_BASE_URL}/notes/${id}`,
    }),
    update: (id, data) => ({
      method: 'PUT',
      url: `${API_BASE_URL}/notes/${id}`,
      data,
    }),
    delete: (id) => ({
      method: 'DELETE',
      url: `${API_BASE_URL}/notes/${id}`,
    }),
  },

  // Bookmarks API
  bookmarks: {
    create: (data) => ({
      method: 'POST',
      url: `${API_BASE_URL}/bookmarks`,
      data,
    }),
    getAll: (query = '') => ({
      method: 'GET',
      url: `${API_BASE_URL}/bookmarks${query}`,
    }),
    getById: (id) => ({
      method: 'GET',
      url: `${API_BASE_URL}/bookmarks/${id}`,
    }),
    update: (id, data) => ({
      method: 'PUT',
      url: `${API_BASE_URL}/bookmarks/${id}`,
      data,
    }),
    delete: (id) => ({
      method: 'DELETE',
      url: `${API_BASE_URL}/bookmarks/${id}`,
    }),
  },
};
