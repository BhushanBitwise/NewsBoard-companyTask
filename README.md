# NewsBoard 🗞️

A modern, responsive news reading application built with React and TailwindCSS. Features include article browsing, bookmarking, reading history tracking, and automatic feed refresh.

---

## 🚀 Live Demo

[View Live Demo](https://news-board-company-task.vercel.app/)

---

## ✨ Features

### 📰 News Feed
- Browse articles from Hacker News API  
- Filter by categories (Technology, Business, Science, etc.)  
- Debounced search (500ms) to reduce API calls  
- Auto-refresh every 5 minutes with indicator  
- Pagination with "Load More"  
- Error Boundary for graceful error handling  

---

### 📖 Article Detail
- Dedicated route for each article (`/article/:id`)  
- Reading time tracking with tab visibility detection  
- Bookmark toggle with instant sync  
- Reading stats display  
- External link to full article  

---

### 🔖 Bookmarks
- Save articles for later  
- Sort by date, source, or title  
- Bulk select & delete  
- 5-second undo delete feature  
- Stored in LocalStorage  

---

###  Reading History
- Tracks visited articles automatically  
- Displays time spent (e.g., `2m 14s`)  
- Stats dashboard  
- Clear history with confirmation  
- Persistent across sessions  

---

##  Tech Stack

- **React 18** – UI library  
- **React Router v6** – Routing  
- **TailwindCSS** – Styling  
- **Context API** – State management  
- **LocalStorage** – Persistence  
- **Hacker News API** – Data source  


---

## 📁 Project Structure

```text
src/
├── api/              # API services
├── components/       # UI components
│   ├── common/      
│   ├── feed/        
│   ├── bookmarks/   
│   └── history/     
├── context/          # Global state
├── hooks/            # Custom hooks
├── pages/            # Routes
├── utils/            # Helpers
└── App.js            # Root component
```

---

## ⚙️ Key Implementation Details

### State Management
- Global state via Context API  
- Component-level local state  
- Persistent state using `useLocalStorage`  

---

### Performance Optimizations
- Debounced search (500ms)  
- Memoization using `useMemo` & `useCallback`  
- Lazy loading (batch of 20 articles)  

---

### Error Handling
- Error Boundary for UI safety  
- API fallback UI on failure  
- LocalStorage wrapped in try-catch  

---

## 🎥 Video Walkthrough

https://drive.google.com/file/d/1gwWsofQ_Zy2TV2oZPsWE7YM6H5WQjY65/view?usp=drive_link

---

## 📄 License
MIT

---

## 👨‍💻 Author
**BhushanBitwise**