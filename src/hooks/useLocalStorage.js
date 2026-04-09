import { useState, useEffect } from 'react';
import Storage from '../utils/storage';

/**
 * Custom hook for syncing state with localStorage
 * Provides persistent state across page refreshes
 * @param {string} key - Storage key
 * @param {*} initialValue - Initial value if key doesn't exist
 * @returns {[*, Function]} State value and setter function
 */
function useLocalStorage(key, initialValue) {
  // Initialize state with value from localStorage or initial value
  const [storedValue, setStoredValue] = useState(() => {
    return Storage.get(key, initialValue);
  });

  // Update localStorage when state changes
  useEffect(() => {
    Storage.set(key, storedValue);
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}

export default useLocalStorage;