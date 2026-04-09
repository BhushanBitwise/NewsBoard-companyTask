export const CATEGORIES = [
  { id: 'all', name: 'All News', query: '' },
  { id: 'technology', name: 'Technology', query: 'technology' },
  { id: 'business', name: 'Business', query: 'business' },
  { id: 'science', name: 'Science', query: 'science' },
  { id: 'health', name: 'Health', query: 'health' },
  { id: 'sports', name: 'Sports', query: 'sports' },
  { id: 'entertainment', name: 'Entertainment', query: 'entertainment' },
];

export const SORT_OPTIONS = [
  { id: 'date', name: 'Date Bookmarked', field: 'bookmarkedAt' },
  { id: 'source', name: 'Source', field: 'source' },
  { id: 'title', name: 'Title', field: 'title' },
];

export const AUTO_REFRESH_INTERVAL = 5 * 60 * 1000; // 5 minutes
export const DEBOUNCE_DELAY = 500; // 500ms
export const UNDO_TIMEOUT = 5000; // 5 seconds
export const ITEMS_PER_PAGE = 20;

export const STORAGE_KEYS = {
  BOOKMARKS: 'newsboard_bookmarks',
  HISTORY: 'newsboard_history',
  LAST_UPDATED: 'newsboard_last_updated',
};

export const API_CONFIG = {
  BASE_URL: 'https://hacker-news.firebaseio.com/v0',
  ENDPOINTS: {
    TOP_STORIES: '/topstories.json',
    NEW_STORIES: '/newstories.json',
    ITEM: '/item',
  },
};