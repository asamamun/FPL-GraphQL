# Quick Start Guide - 2 Terminal Windows

## 🎯 TL;DR - Get Running in 2 Minutes

Open **2 separate terminal windows** and follow these steps:

### Terminal Window 1️⃣ - Backend

```bash
# Start from the root FPL-graphQL folder
node index.js
```

**Expected output:**
```
🚀 FPL GraphQL API ready at: http://localhost:4000
```

Keep this running! ✅

---

### Terminal Window 2️⃣ - Frontend

```bash
# Navigate to frontend
cd frontend

# Install dependencies (first time only)
npm install

# Start development server
npm run dev
```

**Expected output:**
```
VITE v5.x.x  ready in XXX ms

➜  Local:   http://localhost:5173/
```

---

## 🌐 Open in Browser

Go to: **http://localhost:5173**

You should see the FPL Fantasy League app with:
- ⚽ Navbar with Teams, Players, Fixtures links
- 🏠 Home page with welcome message and quick links
- 👥 Clickable team cards
- 📊 Searchable player list
- 📅 Match fixtures with filtering

---

## ✨ Features Ready to Use

- **Teams** → Browse teams → Click "View Players" → See squad
- **Players** → Search players → Click "Details" → See profile
- **Fixtures** → Filter by status → Click to expand match details

---

## 🔄 Workflow

### After Each Session

Stop both processes with `Ctrl+C` in each terminal.

### Next Session

Just run the same commands again in your 2 terminal windows:
```bash
# Terminal 1
node index.js

# Terminal 2
cd frontend && npm run dev
```

---

## 🛠️ Building for Production

When you're ready to deploy:

```bash
cd frontend
npm run build
```

This creates a `dist` folder with optimized production files.

---

## 📋 Backend First Run Only

If it's the first time you're running the backend:

```bash
# Install backend dependencies
npm install

# Then start the server
node index.js
```

---

## 🚨 Common Issues

### Port Already in Use?

**Backend (4000):**
```bash
# Find what's using port 4000 and kill it, or change port in index.js
```

**Frontend (5173):**
```bash
# Vite will suggest next available port automatically
```

### GraphQL Not Connecting?

1. Check backend is running (Terminal 1)
2. Verify output says "ready at http://localhost:4000"
3. Check browser console (F12) for errors
4. Refresh page

### Data Not Loading?

1. Check backend console for GraphQL errors
2. Ensure FPL API is accessible (external)
3. Wait 5 seconds (backend caches for 5 min on first fetch)
4. Hard refresh browser (Ctrl+Shift+R)

---

## 📚 Full Documentation

- See `SETUP_GUIDE.md` for detailed setup
- See `PROJECT_STRUCTURE.md` for architecture overview
- See `frontend/README.md` for frontend details

---

## ⚡ Quick Commands Reference

```bash
# Backend (from root)
npm install          # Install backend deps (first time only)
node index.js        # Start GraphQL server

# Frontend (from frontend folder)
npm install          # Install frontend deps (first time only)
npm run dev          # Start dev server (hot reload)
npm run build        # Build for production
npm run preview      # Preview production build
```

---

## 🎉 That's it!

You now have a fully functional FPL application with:
- ✅ GraphQL Backend
- ✅ Vue 3 Frontend  
- ✅ Bootstrap Styling
- ✅ Router Navigation
- ✅ Apollo Client
- ✅ Real FPL Data

Happy coding! ⚽
