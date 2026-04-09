import React from 'react';
import { formatRelativeTime } from '../../utils/helpers';

/**
 * Feed Header Component
 * Displays last updated time and refresh button
 */
function FeedHeader({ lastUpdated, isRefreshing, onRefresh }) {
  return (
    <div className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Latest News</h1>
            <p className="text-sm text-gray-500 mt-1">
              Last updated: {formatRelativeTime(lastUpdated)}
            </p>
          </div>
          
          <button
            onClick={onRefresh}
            disabled={isRefreshing}
            className="btn-secondary flex items-center gap-2"
          >
            <svg 
              className={`w-5 h-5 ${isRefreshing ? 'animate-spin' : ''}`} 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            {isRefreshing ? 'Refreshing...' : 'Refresh'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default FeedHeader;