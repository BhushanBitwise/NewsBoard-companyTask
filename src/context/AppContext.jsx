import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { STORAGE_KEYS } from '../utils/constants';
import { generateId } from '../utils/helpers';

const AppContext = createContext();

/**
 * Global App Context Provider
 * Manages bookmarks, history, and shared state across the application
 */
export function AppProvider({ children }) {
  // Persistent state
  const [bookmarks, setBookmarks] = useLocalStorage(STORAGE_KEYS.BOOKMARKS, []);
  const [history, setHistory] = useLocalStorage(STORAGE_KEYS.HISTORY, []);
  
  // UI state
  const [toast, setToast] = useState(null);

  /**
   * Check if article is bookmarked
   * @param {number} articleId - Article ID
   * @returns {boolean} Bookmark status
   */
  const isBookmarked = useCallback((articleId) => {
    return bookmarks.some(bookmark => bookmark.id === articleId);
  }, [bookmarks]);

  /**
   * Add article to bookmarks
   * @param {Object} article - Article to bookmark
   */
  const addBookmark = useCallback((article) => {
    setBookmarks(prev => {
      // Prevent duplicates
      if (prev.some(b => b.id === article.id)) {
        return prev;
      }
      
      const bookmark = {
        ...article,
        bookmarkedAt: Date.now(),
        bookmarkId: generateId(),
      };
      
      return [bookmark, ...prev];
    });
    
    showToast('Article bookmarked successfully', 'success');
  }, [setBookmarks]);

  /**
   * Remove article from bookmarks
   * @param {number} articleId - Article ID
   */
  const removeBookmark = useCallback((articleId) => {
    setBookmarks(prev => prev.filter(b => b.id !== articleId));
    showToast('Bookmark removed', 'info');
  }, [setBookmarks]);

  /**
   * Toggle bookmark status
   * @param {Object} article - Article to toggle
   */
  const toggleBookmark = useCallback((article) => {
    if (isBookmarked(article.id)) {
      removeBookmark(article.id);
    } else {
      addBookmark(article);
    }
  }, [isBookmarked, addBookmark, removeBookmark]);

  /**
   * Remove multiple bookmarks
   * @param {Array} articleIds - Array of article IDs
   * @returns {Array} Removed bookmarks (for undo)
   */
  const removeBookmarks = useCallback((articleIds) => {
    const removed = bookmarks.filter(b => articleIds.includes(b.id));
    setBookmarks(prev => prev.filter(b => !articleIds.includes(b.id)));
    return removed;
  }, [bookmarks, setBookmarks]);

  /**
   * Restore bookmarks (for undo)
   * @param {Array} bookmarksToRestore - Bookmarks to restore
   */
  const restoreBookmarks = useCallback((bookmarksToRestore) => {
    setBookmarks(prev => [...bookmarksToRestore, ...prev]);
    showToast('Bookmarks restored', 'success');
  }, [setBookmarks]);

  /**
   * Add article to reading history
   * @param {Object} article - Article
   * @param {number} readingTime - Time spent reading (seconds)
   */
  const addToHistory = useCallback((article, readingTime) => {
    const historyEntry = {
      ...article,
      historyId: generateId(),
      visitedAt: Date.now(),
      readingTime,
    };

    setHistory(prev => {
      // Remove existing entry for this article
      const filtered = prev.filter(h => h.id !== article.id);
      // Add new entry at the beginning
      return [historyEntry, ...filtered];
    });
  }, [setHistory]);

  /**
   * Clear all reading history
   */
  const clearHistory = useCallback(() => {
    setHistory([]);
    showToast('History cleared', 'info');
  }, [setHistory]);

  /**
   * Show toast notification
   * @param {string} message - Toast message
   * @param {string} type - Toast type (success, error, info)
   */
  const showToast = useCallback((message, type = 'info') => {
    setToast({ message, type, id: generateId() });
    
    // Auto-hide after 3 seconds
    setTimeout(() => {
      setToast(null);
    }, 3000);
  }, []);

  /**
   * Hide toast notification
   */
  const hideToast = useCallback(() => {
    setToast(null);
  }, []);

  // Memoized context value
  const value = useMemo(() => ({
    // Bookmarks
    bookmarks,
    isBookmarked,
    addBookmark,
    removeBookmark,
    toggleBookmark,
    removeBookmarks,
    restoreBookmarks,
    
    // History
    history,
    addToHistory,
    clearHistory,
    
    // Toast
    toast,
    showToast,
    hideToast,
  }), [
    bookmarks,
    isBookmarked,
    addBookmark,
    removeBookmark,
    toggleBookmark,
    removeBookmarks,
    restoreBookmarks,
    history,
    addToHistory,
    clearHistory,
    toast,
    showToast,
    hideToast,
  ]);

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

/**
 * Custom hook to use app context
 * @returns {Object} App context
 */
export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
}