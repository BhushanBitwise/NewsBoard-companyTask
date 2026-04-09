import { API_CONFIG } from '../utils/constants';

/**
 * Fetch item details from Hacker News API
 * @param {number} id - Item ID
 * @returns {Promise<Object>} Item details
 */
const fetchItem = async (id) => {
  const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.ITEM}/${id}.json`);
  if (!response.ok) throw new Error('Failed to fetch item');
  return response.json();
};

/**
 * Transform HN item to app article format
 * @param {Object} item - HN item
 * @returns {Object} Formatted article
 */
const transformItem = (item) => {
  if (!item) return null;
  
  return {
    id: item.id,
    title: item.title || 'Untitled',
    url: item.url || `https://news.ycombinator.com/item?id=${item.id}`,
    author: item.by || 'Anonymous',
    source: item.url ? new URL(item.url).hostname.replace('www.', '') : 'Hacker News',
    publishedAt: item.time * 1000, // Convert to milliseconds
    score: item.score || 0,
    comments: item.descendants || 0,
    description: item.text || '',
  };
};

/**
 * News API service
 */
class NewsAPI {
  /**
   * Fetch top stories
   * @param {number} limit - Number of stories to fetch
   * @returns {Promise<Array>} Array of articles
   */
  static async fetchTopStories(limit = 50) {
    try {
      // Fetch story IDs
      const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.TOP_STORIES}`);
      if (!response.ok) throw new Error('Failed to fetch stories');
      
      const ids = await response.json();
      const limitedIds = ids.slice(0, limit);
      
      // Fetch details for each story
      const itemsPromises = limitedIds.map(id => fetchItem(id));
      const items = await Promise.allSettled(itemsPromises);
      
      // Transform and filter successful responses
      return items
        .filter(result => result.status === 'fulfilled' && result.value)
        .map(result => transformItem(result.value))
        .filter(Boolean);
    } catch (error) {
      console.error('Error fetching top stories:', error);
      throw error;
    }
  }

  /**
   * Fetch new stories
   * @param {number} limit - Number of stories to fetch
   * @returns {Promise<Array>} Array of articles
   */
  static async fetchNewStories(limit = 50) {
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.NEW_STORIES}`);
      if (!response.ok) throw new Error('Failed to fetch new stories');
      
      const ids = await response.json();
      const limitedIds = ids.slice(0, limit);
      
      const itemsPromises = limitedIds.map(id => fetchItem(id));
      const items = await Promise.allSettled(itemsPromises);
      
      return items
        .filter(result => result.status === 'fulfilled' && result.value)
        .map(result => transformItem(result.value))
        .filter(Boolean);
    } catch (error) {
      console.error('Error fetching new stories:', error);
      throw error;
    }
  }

  /**
   * Fetch article by ID
   * @param {number} id - Article ID
   * @returns {Promise<Object>} Article details
   */
  static async fetchArticleById(id) {
    try {
      const item = await fetchItem(id);
      return transformItem(item);
    } catch (error) {
      console.error(`Error fetching article ${id}:`, error);
      throw error;
    }
  }

  /**
   * Search articles (mock implementation for HN)
   * @param {string} query - Search query
   * @param {Array} articles - Articles to search
   * @returns {Array} Filtered articles
   */
  static searchArticles(query, articles) {
    if (!query.trim()) return articles;
    
    const term = query.toLowerCase();
    return articles.filter(article =>
      article.title.toLowerCase().includes(term) ||
      article.author.toLowerCase().includes(term) ||
      article.source.toLowerCase().includes(term)
    );
  }

  /**
   * Filter articles by category (mock implementation)
   * @param {string} category - Category to filter
   * @param {Array} articles - Articles to filter
   * @returns {Array} Filtered articles
   */
  static filterByCategory(category, articles) {
    if (category === 'all' || !category) return articles;
    
    const categoryKeywords = {
      technology: ['tech', 'software', 'programming', 'code', 'developer', 'ai', 'ml'],
      business: ['business', 'startup', 'company', 'market', 'economy'],
      science: ['science', 'research', 'study', 'discovery'],
      health: ['health', 'medical', 'disease', 'treatment'],
      sports: ['sport', 'game', 'player', 'team'],
      entertainment: ['movie', 'music', 'game', 'entertainment'],
    };
    
    const keywords = categoryKeywords[category] || [];
    return articles.filter(article => {
      const text = `${article.title} ${article.description}`.toLowerCase();
      return keywords.some(keyword => text.includes(keyword));
    });
  }
}

export default NewsAPI;