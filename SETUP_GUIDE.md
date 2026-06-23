# FPL GraphQL Project - Complete Setup Guide

This is a full-stack Fantasy Premier League application with a GraphQL backend and Vue 3 frontend.

## 📦 Project Structure

```
FPL-graphQL/
├── index.js                 # GraphQL Apollo Server (Backend)
├── package.json            # Backend dependencies
├── package-lock.json       # Backend lock file
├── frontend/               # Vue 3 Frontend Application
│   ├── src/
│   │   ├── components/     # Vue components
│   │   ├── pages/          # Page components
│   │   ├── router/         # Vue Router config
│   │   ├── graphql/        # GraphQL queries
│   │   ├── App.vue         # Root component
│   │   └── main.js         # Entry point
│   ├── index.html          # HTML template
│   ├── vite.config.js      # Vite config
│   ├── package.json        # Frontend dependencies
│   └── README.md           # Frontend docs
└── SETUP_GUIDE.md         # This file
```

## 🔧 Prerequisites

- **Node.js** 16+ (Install from nodejs.org)
- **npm** (comes with Node.js)
- **XAMPP** or any local server (for serving files if needed)

## 🚀 Quick Start

### 1. Backend Setup

The backend is already configured at the root level. Run it first:

```bash
# From the root directory (FPL-graphQL/)
npm install
node index.js
```

You should see:
```
🚀 FPL GraphQL API ready at: http://localhost:4000
```

Keep this running in a terminal window.

### 2. Frontend Setup

In a new terminal window:

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

You should see:
```
VITE v5.x.x  ready in XXX ms

➜  Local:   http://localhost:5173/
```

### 3. Access the Application

Open your browser and go to:
```
http://localhost:5173/
```

## 🌐 Application Flow

1. **Navbar Navigation**
   - Click "Teams" → Browse all Premier League teams
   - Click "Players" → Search and view all players
   - Click "Fixtures" → Check match results and upcoming games

2. **Teams Section**
   - See all teams in card layout
   - Click "View Players" on any team card
   - This shows all players in that team

3. **Team Players**
   - View squad players with positions and points
   - Click "View Details" on any player
   - See detailed player information

4. **Players Section**
   - Search players by name
   - Click "Details" to see full profile
   - Table view with team and position info

5. **Fixtures Section**
   - Filter by: All, Completed, Upcoming matches
   - See match scores and teams
   - Click fixture card for more details

## 🔗 How It Works

1. **Backend (GraphQL)**
   - Fetches data from official FPL API
   - Caches data for 5 minutes
   - Serves GraphQL endpoint at `http://localhost:4000`

2. **Frontend (Vue 3)**
   - Uses Apollo Client to query GraphQL
   - Router handles page navigation
   - Components fetch data as needed

3. **Communication Flow**
   ```
   User Interaction → Vue Component → Apollo Client Query 
   → GraphQL Backend → FPL API → Response → Render in Component
   ```

## 📚 Tech Stack Summary

| Layer | Technology | Purpose |
|-------|-----------|---------|
| Frontend UI | Vue 3 | Component framework |
| Routing | Vue Router | Page navigation |
| Data Layer | Apollo Client | GraphQL client |
| Styling | Bootstrap 5.3 | CSS framework |
| Build Tool | Vite | Fast build and dev server |
| Backend | Apollo Server | GraphQL server |
| API | GraphQL | Query language |

## 🛠️ Available Commands

### Backend Commands
```bash
# From root directory
npm install      # Install dependencies
node index.js    # Start GraphQL server
```

### Frontend Commands
```bash
# From frontend directory
npm install      # Install dependencies
npm run dev      # Start dev server (port 5173)
npm run build    # Build for production
npm run preview  # Preview production build
```

## 📡 API Endpoints

- **GraphQL Endpoint**: `http://localhost:4000`
- **Apollo Studio**: `http://localhost:4000` (interactive playground)
- **Frontend Dev Server**: `http://localhost:5173`

## 🔍 Testing Queries

You can test GraphQL queries in Apollo Studio (available at `http://localhost:4000`):

```graphql
# Get all teams
query {
  teams {
    id
    name
    short_name
  }
}

# Get team with players
query {
  teams {
    id
    name
    players {
      first_name
      second_name
      total_points
    }
  }
}

# Get fixtures
query {
  fixtures {
    id
    kickoff_time
    team_h_score
    team_a_score
    finished
    team_h { name }
    team_a { name }
  }
}

# Get top scorers
query {
  topScorers(limit: 10) {
    first_name
    second_name
    total_points
    team { name }
  }
}
```

## 🎨 Frontend Features

### Components & Pages
- ✅ Navbar with navigation
- ✅ Home page with overview
- ✅ Teams listing
- ✅ Team players detail
- ✅ Players search & filter
- ✅ Player detail page
- ✅ Fixtures with filtering

### UI Elements
- ✅ Responsive card layouts
- ✅ Data tables with sorting
- ✅ Search functionality
- ✅ Filter buttons
- ✅ Loading states
- ✅ Error handling
- ✅ Bootstrap styling

## 🐛 Troubleshooting

### Backend won't start
```bash
# Check if port 4000 is in use
# Kill process or use different port
```

### Frontend won't connect to backend
- Verify backend is running on `http://localhost:4000`
- Check browser console for CORS errors
- Ensure firewall allows local connections

### Data not loading
1. Check backend logs for errors
2. Verify FPL API is accessible (external)
3. Check browser DevTools Network tab
4. Verify Apollo Client queries in frontend/src/graphql/queries.js

### Styling issues
1. Clear browser cache (Ctrl+Shift+Del)
2. Rebuild: `npm run build` in frontend directory
3. Check Bootstrap CSS is loaded in DevTools

## 📖 Project Files Overview

### Backend
- **index.js** - Apollo Server setup with GraphQL resolvers
  - Types: Team, Player, Position, Fixture
  - Queries: teams, players, fixtures, topScorers
  - Resolvers handle nested queries

### Frontend
- **App.vue** - Root component with navbar
- **router/index.js** - Route definitions
- **apollo.js** - Apollo Client setup
- **graphql/queries.js** - GraphQL query definitions
- **pages/** - Page components for each section
- **vite.config.js** - Build tool configuration

## 🚀 Production Deployment

To build for production:

```bash
cd frontend
npm run build
```

This creates a `dist` folder with optimized files ready for deployment.

## 📝 Notes

- Backend caches data for 5 minutes
- All timestamps are UTC
- Search is case-insensitive
- Responsive design works on mobile, tablet, desktop
- Loading states show while fetching data

## 💡 Next Steps (Optional Enhancements)

- [ ] Add player stats charts
- [ ] Implement favorite players/teams
- [ ] Add team statistics
- [ ] Create league standings page
- [ ] Add player form trends
- [ ] Implement dark mode toggle
- [ ] Add data export (CSV/PDF)
- [ ] Real-time update WebSockets

## 📞 Support

For issues:
1. Check the troubleshooting section above
2. Review console logs (F12 in browser)
3. Verify both backend and frontend are running
4. Check network requests in DevTools

---

**Happy coding!** ⚽
