import React from 'react';
import { Link } from 'react-router-dom';
import { formatDate } from '../../utils/helpers';

/**
 * Bookmark List Component
 * Displays list of bookmarked articles with selection
 */
function BookmarkList({ bookmarks, selectedIds, onToggleSelect }) {
  if (bookmarks.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-12 h-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">No bookmarks yet</h3>
        <p className="text-gray-600">Start bookmarking articles to read them later</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {bookmarks.map(bookmark => {
        const isSelected = selectedIds.includes(bookmark.id);
        
        return (
          <div
            key={bookmark.bookmarkId}
            className={`card flex items-start gap-4 ${isSelected ? 'ring-2 ring-primary-500' : ''}`}
          >
            <input
              type="checkbox"
              checked={isSelected}
              onChange={() => onToggleSelect(bookmark.id)}
              className="mt-1 w-5 h-5 text-primary-600 rounded focus:ring-2 focus:ring-primary-500"
            />
            
            <div className="flex-1 min-w-0">
              <Link 
                to={`/article/${bookmark.id}`}
                className="group"
              >
                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary-600 transition-colors mb-2">
                  {bookmark.title}
                </h3>
                
                <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
                  <span className="font-medium text-primary-600">{bookmark.source}</span>
                  <span>•</span>
                  <span>Bookmarked: {formatDate(bookmark.bookmarkedAt)}</span>
                  <span>•</span>
                  <span>by {bookmark.author}</span>
                </div>
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default BookmarkList;