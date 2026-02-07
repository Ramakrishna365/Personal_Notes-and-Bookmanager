import axios from 'axios';
import { apiClient } from './api';

export const fetchNotes = async (searchQuery = '', tags = '') => {
  try {
    const params = new URLSearchParams();
    if (searchQuery) params.append('q', searchQuery);
    if (tags) params.append('tags', tags);
    
    const query = params.toString() ? `?${params.toString()}` : '';
    const config = apiClient.notes.getAll(query);
    
    const response = await axios(config);
    return response.data.data || [];
  } catch (error) {
    console.error('Error fetching notes:', error);
    return [];
  }
};

export const fetchBookmarks = async (searchQuery = '', tags = '') => {
  try {
    const params = new URLSearchParams();
    if (searchQuery) params.append('q', searchQuery);
    if (tags) params.append('tags', tags);
    
    const query = params.toString() ? `?${params.toString()}` : '';
    const config = apiClient.bookmarks.getAll(query);
    
    const response = await axios(config);
    return response.data.data || [];
  } catch (error) {
    console.error('Error fetching bookmarks:', error);
    return [];
  }
};

export const createNote = async (noteData) => {
  try {
    const config = apiClient.notes.create(noteData);
    const response = await axios(config);
    return response.data.data;
  } catch (error) {
    console.error('Error creating note:', error);
    throw error;
  }
};

export const createBookmark = async (bookmarkData) => {
  try {
    const config = apiClient.bookmarks.create(bookmarkData);
    const response = await axios(config);
    return response.data.data;
  } catch (error) {
    console.error('Error creating bookmark:', error);
    throw error;
  }
};

export const deleteNote = async (id) => {
  try {
    const config = apiClient.notes.delete(id);
    await axios(config);
    return true;
  } catch (error) {
    console.error('Error deleting note:', error);
    throw error;
  }
};

export const deleteBookmark = async (id) => {
  try {
    const config = apiClient.bookmarks.delete(id);
    await axios(config);
    return true;
  } catch (error) {
    console.error('Error deleting bookmark:', error);
    throw error;
  }
};

export const updateNote = async (id, noteData) => {
  try {
    const config = apiClient.notes.update(id, noteData);
    const response = await axios(config);
    return response.data.data;
  } catch (error) {
    console.error('Error updating note:', error);
    throw error;
  }
};

export const updateBookmark = async (id, bookmarkData) => {
  try {
    const config = apiClient.bookmarks.update(id, bookmarkData);
    const response = await axios(config);
    return response.data.data;
  } catch (error) {
    console.error('Error updating bookmark:', error);
    throw error;
  }
};
