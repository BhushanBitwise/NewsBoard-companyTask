import React from 'react';
import HistoryItem from './HistoryItem';

/**
 * History List Component
 * Displays list of reading history
 */
function HistoryList({ history }) {
  if (history.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-12 h-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">No reading history</h3>
        <p className="text-gray-600">Articles you read will appear here</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {history.map(item => (
        <HistoryItem key={item.historyId} item={item} />
      ))}
    </div>
  );
}

export default HistoryList;