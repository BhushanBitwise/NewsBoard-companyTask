import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { formatRelativeTime, truncateText } from '../../utils/helpers';

/**
 * Article Card Component
 * Displays article preview with bookmark functionality
 */
function ArticleCard({ article }) {
  const { isBookmarked, toggleBookmark } = useApp();
  const bookmarked = isBookmarked(article.id);

  const handleBookmarkClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleBookmark(article);
  };

  return (
    <Link 
      to={`/article/${article.id}`}
      className="card hover:scale-[1.02] transition-transform duration-200 block"
    >
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 mb-2">
              {article.title}
            </h3>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span className="font-medium text-primary-600">{article.source}</span>
              <span>•</span>
              <span>{formatRelativeTime(article.publishedAt)}</span>
            </div>
          </div>
          
          <button
            onClick={handleBookmarkClick}
            className="flex-shrink-0 p-2 hover:bg-gray-100 rounded-lg transition-colors"
            title={bookmarked ? 'Remove bookmark' : 'Add bookmark'}
          >
            <svg 
              className={`w-6 h-6 ${bookmarked ? 'fill-primary-600 text-primary-600' : 'text-gray-400'}`}
              fill={bookmarked ? 'currentColor' : 'none'}
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
            </svg>
          </button>
        </div>

        {/* Description */}
        {article.description && (
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {truncateText(article.description, 150)}
          </p>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-100">
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
              </svg>
              <span>{article.score || 0}</span>
            </div>
            
            <div className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
              </svg>
              <span>{article.comments || 0}</span>
            </div>
          </div>
          
          <span className="text-xs text-gray-400">
            by {article.author}
          </span>
        </div>
      </div>
    </Link>
  );
}

export default ArticleCard;