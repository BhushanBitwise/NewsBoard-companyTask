# Development Reflection

## Top 3 Good Practices Applied

### 1. Custom Hooks for Reusability

**What I Did:**
I created custom hooks like `useDebounce`, `useLocalStorage`, `useReadingTime`, and `useAutoRefresh` to handle reusable logic across components.

**Why It's Good:**

* Separation of concerns (logic separate from UI)
* Reusability across multiple components
* Easy to test independently
* Improves maintainability

**Example:**
The `useDebounce` hook delays API calls until the user stops typing (500ms), reducing unnecessary API requests and improving performance.

---

### 2. Error Boundary Implementation

**What I Did:**
Implemented an Error Boundary component to catch runtime errors and display a fallback UI instead of crashing the entire app.

**Why It's Good:**

* Prevents full app crashes
* Improves user experience
* Helps debugging during development
* Provides recovery option (e.g., "Go Home")

**Impact:**
Even if one component fails, the rest of the app continues to work smoothly.

---

### 3. Context API with Memoization

**What I Did:**
Used Context API for global state management along with `useMemo` and `useCallback` to optimize performance.

**Why It's Good:**

* Prevents unnecessary re-renders
* Centralized state management
* Scalable architecture
* Cleaner code structure

**Example:**

```javascript
const value = useMemo(() => ({
  bookmarks,
  isBookmarked,
}), [bookmarks]);
```

This ensures components only re-render when required data changes.

---

## One Real Challenge I Faced

### Challenge: Reading Time Tracking with Tab Visibility

**The Problem:**
Reading time was increasing even when the user switched tabs or minimized the browser, leading to inaccurate data.

---

### Why It Was Difficult:

* `setInterval` keeps running in background tabs
* Detecting actual user activity is tricky
* Browser behavior differs
* `blur/focus` events were unreliable

---

### My Approach:

#### First Attempt (Failed)

```javascript
window.addEventListener('blur', pauseTimer);
window.addEventListener('focus', resumeTimer);
```

**Issue:** Not consistent across browsers.

---

#### Final Solution (Successful)

```javascript
const handleVisibilityChange = () => {
  if (document.hidden) {
    isActiveRef.current = false;
  } else {
    isActiveRef.current = true;
    startTimeRef.current = Date.now();
  }
};
```

---

### Final Implementation:

* Used Page Visibility API (`document.hidden`)
* Tracked active state using `useRef`
* Timer runs only when tab is visible
* Reset time correctly on return

---

### Result:

* Accurate reading time tracking
* Works across Chrome, Firefox, and Safari
* Prevents inflated metrics

---

## What I Learned

* Page Visibility API is more reliable than window events
* `useRef` is useful for non-render state tracking
* Cross-browser testing is important
* User-facing data must be accurate to maintain trust

---
