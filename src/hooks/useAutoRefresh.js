import { useState, useEffect, useCallback } from 'react';
import { AUTO_REFRESH_INTERVAL } from '../utils/constants';

/**
 * Custom hook for auto-refreshing data at intervals
 * Manages refresh state and provides manual refresh capability
 * @param {Function} refreshCallback - Function to call on refresh
 * @param {number} interval - Refresh interval in milliseconds
 * @returns {Object} Refresh state and controls
 */
function useAutoRefresh(refreshCallback, interval = AUTO_REFRESH_INTERVAL) {
  const [lastUpdated, setLastUpdated] = useState(Date.now());
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Manual refresh function
  const refresh = useCallback(async () => {
    setIsRefreshing(true);
    try {
      await refreshCallback();
      setLastUpdated(Date.now());
    } catch (error) {
      console.error('Refresh failed:', error);
    } finally {
      setIsRefreshing(false);
    }
  }, [refreshCallback]);

  // Auto refresh effect
  useEffect(() => {
    const intervalId = setInterval(() => {
      refresh();
    }, interval);

    return () => clearInterval(intervalId);
  }, [refresh, interval]);

  return {
    lastUpdated,
    isRefreshing,
    refresh,
  };
}

export default useAutoRefresh;