import React, { useState, useEffect, useCallback } from 'react';
import NewsAPI from '../api/newsApi';
import ArticleCard from '../components/feed/ArticleCard';
import CategoryFilter from '../components/feed/CategoryFilter';
import FeedHeader from '../components/feed/FeedHeader';
import SearchBar from '../components/common/SearchBar';
import LoadingSpinner from '../components/common/LoadingSpinner';
import useAutoRefresh from '../hooks/useAutoRefresh';
import { ITEMS_PER_PAGE } from '../utils/constants';

/**
 * Feed Page Component
 * Main news feed with filtering, search, and auto-refresh
 */
function Feed() {
  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [displayedArticles, setDisplayedArticles] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  /**
   * Fetch articles from API
   */
  const fetchArticles = useCallback(async () => {
    try {
      setError(null);
      const data = await NewsAPI.fetchTopStories(100);
      setArticles(data);
      return data;
    } catch (err) {
      setError('Failed to fetch articles. Please try again later.');
      console.error('Error fetching articles:', err);
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  // Auto-refresh functionality
  const { lastUpdated, isRefreshing, refresh } = useAutoRefresh(fetchArticles);

  // Initial load
  useEffect(() => {
    fetchArticles();
  }, [fetchArticles]);

  /**
   * Filter articles by category and search term
   */
  useEffect(() => {
    let filtered = articles;

    // Apply category filter
    if (activeCategory !== 'all') {
      filtered = NewsAPI.filterByCategory(activeCategory, filtered);
    }

    // Apply search filter
    if (searchTerm.trim()) {
      filtered = NewsAPI.searchArticles(searchTerm, filtered);
    }

    setFilteredArticles(filtered);
    setPage(1); // Reset pagination
  }, [articles, activeCategory, searchTerm]);

  /**
   * Handle pagination
   */
  useEffect(() => {
    const startIndex = 0;
    const endIndex = page * ITEMS_PER_PAGE;
    const displayed = filteredArticles.slice(startIndex, endIndex);
    
    setDisplayedArticles(displayed);
    setHasMore(endIndex < filteredArticles.length);
  }, [filteredArticles, page]);

  /**
   * Load more articles
   */
  const handleLoadMore = () => {
    setPage(prev => prev + 1);
  };

  /**
   * Handle search
   */
  const handleSearch = useCallback((term) => {
    setSearchTerm(term);
  }, []);

  /**
   * Handle category change
   */
  const handleCategoryChange = (category) => {
    setActiveCategory(category);
  };

  // Error state
  if (error && !articles.length) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Unable to Load Articles</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button onClick={refresh} className="btn-primary">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <FeedHeader 
        lastUpdated={lastUpdated}
        isRefreshing={isRefreshing}
        onRefresh={refresh}
      />
      
      <CategoryFilter
        activeCategory={activeCategory}
        onCategoryChange={handleCategoryChange}
      />

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Search Bar */}
        <div className="mb-6">
          <SearchBar onSearch={handleSearch} />
        </div>

        {/* Results Info */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-gray-600">
            Showing {displayedArticles.length} of {filteredArticles.length} articles
            {searchTerm && ` for "${searchTerm}"`}
          </p>
          
          {error && (
            <p className="text-sm text-red-600">{error}</p>
          )}
        </div>

        {/* Loading State */}
        {loading && <LoadingSpinner text="Loading articles..." />}

        {/* Articles Grid */}
        {!loading && displayedArticles.length > 0 && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {displayedArticles.map(article => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>

            {/* Load More Button */}
            {hasMore && (
              <div className="text-center">
                <button
                  onClick={handleLoadMore}
                  className="btn-primary"
                >
                  Load More Articles
                </button>
              </div>
            )}
          </>
        )}

        {/* Empty State */}
        {!loading && displayedArticles.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-12 h-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No articles found</h3>
            <p className="text-gray-600">Try adjusting your filters or search term</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Feed;