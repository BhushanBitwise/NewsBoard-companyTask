import React from 'react';

/**
 * Bulk Actions Component
 * Provides bulk selection and deletion for bookmarks
 */
function BulkActions({ 
  selectedCount, 
  totalCount,
  onSelectAll, 
  onDeselectAll, 
  onDeleteSelected,
  allSelected 
}) {
  return (
    <div className="bg-primary-50 border border-primary-200 rounded-lg p-4">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={allSelected}
              onChange={allSelected ? onDeselectAll : onSelectAll}
              className="w-5 h-5 text-primary-600 rounded focus:ring-2 focus:ring-primary-500"
            />
            <span className="text-sm font-medium text-gray-700">
              {selectedCount > 0 ? `${selectedCount} selected` : 'Select all'}
            </span>
          </div>
          
          {selectedCount > 0 && (
            <span className="text-sm text-gray-500">
              out of {totalCount} bookmarks
            </span>
          )}
        </div>
        
        {selectedCount > 0 && (
          <button
            onClick={onDeleteSelected}
            className="btn-danger flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            Delete Selected
          </button>
        )}
      </div>
    </div>
  );
}

export default BulkActions;