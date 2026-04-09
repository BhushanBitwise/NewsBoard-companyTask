import React from 'react';
import { Link } from 'react-router-dom';
import { formatDate, formatReadingTime } from '../../utils/helpers';

/**
 * History Item Component
 * Displays single history entry
 */
function HistoryItem({ item }) {
  return (
    <Link 
      to={`/article/${item.id}`}
      className="card flex items-start gap-4 hover:shadow-lg transition-shadow"
    >
      <div className="flex-shrink-0 w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
        <svg className="w-6 h-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      </div>
      
      <div className="flex-1 min-w-0">
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
          {item.title}
        </h3>
        
        <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
          <span className="font-medium text-primary-600">{item.source}</span>
          <span>•</span>
          <span>{formatDate(item.visitedAt)}</span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {formatReadingTime(item.readingTime)}
          </span>
        </div>
      </div>
    </Link>
  );
}

export default HistoryItem;