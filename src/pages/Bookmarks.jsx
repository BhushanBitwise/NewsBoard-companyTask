import React, { useState, useMemo, useCallback } from 'react';
import { useApp } from '../context/AppContext';
import BookmarkList from '../components/bookmarks/BookmarkList';
import BulkActions from '../components/bookmarks/BulkActions';
import SortControls from '../components/bookmarks/SortControls';
import { SORT_OPTIONS, UNDO_TIMEOUT } from '../utils/constants';
import { sortByField } from '../utils/helpers';

/**
 * Bookmarks Page Component
 * Manage bookmarked articles with sorting and bulk deletion
 */
function Bookmarks() {
  const { bookmarks, removeBookmarks, restoreBookmarks, showToast } = useApp();
  const [selectedIds, setSelectedIds] = useState([]);
  const [sortBy, setSortBy] = useState('date');
  const [undoTimer, setUndoTimer] = useState(null);
  const [pendingDelete, setPendingDelete] = useState(null);

  /**
   * Get sorted bookmarks
   */
  const sortedBookmarks = useMemo(() => {
    const sortOption = SORT_OPTIONS.find(opt => opt.id === sortBy);
    if (!sortOption) return bookmarks;
    
    return sortByField(bookmarks, sortOption.field, 'desc');
  }, [bookmarks, sortBy]);

  /**
   * Toggle selection for a bookmark
   */
  const handleToggleSelect = useCallback((id) => {
    setSelectedIds(prev => 
      prev.includes(id)
        ? prev.filter(selectedId => selectedId !== id)
        : [...prev, id]
    );
  }, []);

  /**
   * Select all bookmarks
   */
  const handleSelectAll = useCallback(() => {
    setSelectedIds(bookmarks.map(b => b.id));
  }, [bookmarks]);

  /**
   * Deselect all bookmarks
   */
  const handleDeselectAll = useCallback(() => {
    setSelectedIds([]);
  }, []);

  /**
   * Delete selected bookmarks with undo
   */
  const handleDeleteSelected = useCallback(() => {
    if (selectedIds.length === 0) return;

    // Clear any existing undo timer
    if (undoTimer) {
      clearTimeout(undoTimer);
    }

    // Remove bookmarks and store for undo
    const removed = removeBookmarks(selectedIds);
    setPendingDelete(removed);
    setSelectedIds([]);

    // Show undo toast
    showToast(
      `${selectedIds.length} bookmark${selectedIds.length > 1 ? 's' : ''} deleted. You have 5 seconds to undo.`,
      'info'
    );

    // Set timer to commit deletion
    const timer = setTimeout(() => {
      setPendingDelete(null);
      setUndoTimer(null);
    }, UNDO_TIMEOUT);

    setUndoTimer(timer);
  }, [selectedIds, undoTimer, removeBookmarks, showToast]);

  /**
   * Undo deletion
   */
  const handleUndo = useCallback(() => {
    if (pendingDelete && undoTimer) {
      clearTimeout(undoTimer);
      restoreBookmarks(pendingDelete);
      setPendingDelete(null);
      setUndoTimer(null);
    }
  }, [pendingDelete, undoTimer, restoreBookmarks]);

  const allSelected = selectedIds.length === bookmarks.length && bookmarks.length > 0;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Bookmarks</h1>
              <p className="text-gray-600 mt-1">
                {bookmarks.length} saved article{bookmarks.length !== 1 ? 's' : ''}
              </p>
            </div>
            
            <SortControls sortBy={sortBy} onSortChange={setSortBy} />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Undo Banner */}
        {pendingDelete && (
          <div className="mb-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-center justify-between animate-slide-up">
            <div className="flex items-center gap-3">
              <svg className="w-5 h-5 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <p className="text-sm font-medium text-yellow-800">
                Bookmarks deleted. This action will be permanent in a few seconds.
              </p>
            </div>
            <button
              onClick={handleUndo}
              className="btn-primary text-sm"
            >
              Undo
            </button>
          </div>
        )}

        {/* Bulk Actions */}
        {bookmarks.length > 0 && (
          <div className="mb-6">
            <BulkActions
              selectedCount={selectedIds.length}
              totalCount={bookmarks.length}
              onSelectAll={handleSelectAll}
              onDeselectAll={handleDeselectAll}
              onDeleteSelected={handleDeleteSelected}
              allSelected={allSelected}
            />
          </div>
        )}

        {/* Bookmarks List */}
        <BookmarkList
          bookmarks={sortedBookmarks}
          selectedIds={selectedIds}
          onToggleSelect={handleToggleSelect}
        />
      </div>
    </div>
  );
}

export default Bookmarks;