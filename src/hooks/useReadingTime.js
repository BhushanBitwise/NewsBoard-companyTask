import { useState, useEffect, useRef } from 'react';

/**
 * Custom hook to track reading time on a page
 * Accurately measures time spent with tab visibility detection
 * @returns {number} Reading time in seconds
 */
function useReadingTime() {
  const [readingTime, setReadingTime] = useState(0);
  const intervalRef = useRef(null);
  const startTimeRef = useRef(Date.now());
  const isActiveRef = useRef(true);

  useEffect(() => {
    // Handle visibility change (tab switching)
    const handleVisibilityChange = () => {
      if (document.hidden) {
        isActiveRef.current = false;
      } else {
        isActiveRef.current = true;
        startTimeRef.current = Date.now();
      }
    };

    // Track time every second when tab is active
    intervalRef.current = setInterval(() => {
      if (isActiveRef.current) {
        setReadingTime(prev => prev + 1);
      }
    }, 1000);

    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Cleanup
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return readingTime;
}

export default useReadingTime;