import React from 'react';
import { CATEGORIES } from '../../utils/constants';

/**
 * Category Filter Component
 * Displays category tabs for filtering articles
 */
function CategoryFilter({ activeCategory, onCategoryChange }) {
  return (
    <div className="bg-white border-b border-gray-200 overflow-x-auto">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex gap-2 py-3">
          {CATEGORIES.map(category => (
            <button
              key={category.id}
              onClick={() => onCategoryChange(category.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                activeCategory === category.id
                  ? 'bg-primary-600 text-white shadow-sm'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CategoryFilter;