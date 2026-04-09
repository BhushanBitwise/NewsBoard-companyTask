import React from 'react';
import { SORT_OPTIONS } from '../../utils/constants';

/**
 * Sort Controls Component
 * Provides sorting options for bookmarks
 */
function SortControls({ sortBy, onSortChange }) {
  return (
    <div className="flex items-center gap-3">
      <label className="text-sm font-medium text-gray-700">
        Sort by:
      </label>
      
      <select
        value={sortBy}
        onChange={(e) => onSortChange(e.target.value)}
        className="input-field py-2 text-sm"
      >
        {SORT_OPTIONS.map(option => (
          <option key={option.id} value={option.id}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SortControls;