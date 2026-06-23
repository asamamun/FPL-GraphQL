# 🏆 FPL Fantasy League - Full Stack Application

A modern full-stack application for exploring Fantasy Premier League data with teams, players, and fixtures.

Built with **Vue 3**, **GraphQL**, **Apollo Client**, and **Bootstrap 5.3**.

---

## 🎯 Quick Links

| Document | Purpose |
|----------|---------|
| **[QUICK_START.md](./QUICK_START.md)** | 2-minute setup guide |
| **[SETUP_GUIDE.md](./SETUP_GUIDE.md)** | Detailed setup instructions |
| **[PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md)** | Architecture & file organization |
| **[GRAPHQL_QUERIES.md](./GRAPHQL_QUERIES.md)** | All available GraphQL queries |
| **[frontend/README.md](./frontend/README.md)** | Frontend-specific docs |

---

## ⚡ Quick Start (2 Minutes)

### Terminal 1 - Backend
```bash
node index.js
```
Output: `🚀 FPL GraphQL API ready at: http://localhost:4000`

### Terminal 2 - Frontend
```bash
cd frontend
npm install  # First time only
npm run dev
```
Output: `➜  Local:   http://localhost:5173/`

### Open Browser
```
http://localhost:5173
```

That's it! 🎉

---

## 📊 What You Get

### Frontend Features
- ✅ **Teams** - Browse all 20 Premier League teams in card layout
- ✅ **Team Players** - View squad players when you click on a team
- ✅ **Players** - Searchable table of 600+ players with filters
- ✅ **Player Details** - Individual player profiles with stats
- ✅ **Fixtures** - Match results with filtering (All/Completed/Upcoming)
- ✅ **Responsive Design** - Works on mobile, tablet, desktop
- ✅ **Dark Navbar** - Professional Bootstrap 5.3 styling

### Backend Features
- ✅ **GraphQL API** - Type-safe queries
- ✅ **Smart Caching** - 5-minute cache to reduce API calls
- ✅ **FPL Integration** - Real data from official FPL API
- ✅ **Nested Queries** - Teams know their players, players know their teams
- ✅ **Top Scorers** - Built-in query for highest scoring players

---

## 🏗️ Tech Stack

```
Frontend:
  • Vue 3 (Component framework)
  • Vue Router (Page navigation)
  • Apollo Client (GraphQL client)
  • @vue/apollo-composable (Vue hooks)
  • Bootstrap 5.3 (CSS styling)
  • Vite (Build tool)

Backend:
  • Apollo Server (GraphQL server)
  • GraphQL (Query language)
  • Node.js (Runtime)

Data:
  • Fantasy Premier League API (Official)
```

---

## 🎮 Features in Action

### Teams Page
1. See all 20 Premier League teams
2. Click "View Players" on any team
3. Go to Team Players page

### Team Players Page
1. View all players in that team
2. See position badge and total points
3. Click "View Details" on any player
4. Go to Player Details page

### Players Page
1. Search for players by name (case-insensitive)
2. See team and position for each player
3. Sort by points badge color
4. Click "Details" to see full profile

### Player Details Page
1. See full player information
2. Team affiliation with short name badge
3. Position details (singular & plural)
4. Total points and calculated rating
5. Link back to team squad

### Fixtures Page
1. Filter matches: All, Completed, Upcoming
2. See team names and scores
3. Click any fixture to expand details
4. See completion status and match info

---

## 📁 Project Structure

```
FPL-graphQL/
├── index.js                    ← GraphQL Backend
├── package.json                ← Backend dependencies
├── QUICK_START.md              ← Fast setup guide
├── SETUP_GUIDE.md              ← Detailed instructions
├── PROJECT_STRUCTURE.md        ← Architecture overview
├── GRAPHQL_QUERIES.md          ← All queries
└── frontend/                   ← Vue 3 Frontend
    ├── src/
    │   ├── pages/              ← Page components
    │   ├── router/             ← Route definitions
    │   ├── graphql/            ← GraphQL queries
    │   ├── App.vue             ← Root with navbar
    │   └── main.js             ← Entry point
    ├── package.json            ← Frontend dependencies
    ├── vite.config.js          ← Build config
    └── README.md               ← Frontend docs
```

---

## 🚀 Commands Cheat Sheet

### Backend
```bash
npm install              # Install dependencies (first time only)
node index.js            # Start GraphQL server on :4000
```

### Frontend
```bash
cd frontend
npm install              # Install dependencies (first time only)
npm run dev              # Start dev server on :5173 (hot reload)
npm run build            # Build for production
npm run preview          # Preview production build
```

---

## 🔗 Important URLs

| Service | URL | Purpose |
|---------|-----|---------|
| Frontend Dev | `http://localhost:5173` | Vue 3 app |
| GraphQL Server | `http://localhost:4000` | API endpoint |
| Apollo Studio | `http://localhost:4000` | Query explorer |

---

## 🔍 Routes (Frontend Navigation)

| Route | Page | Purpose |
|-------|------|---------|
| `/` | Home | Welcome & overview |
| `/teams` | Teams | All teams listing |
| `/teams/:id` | TeamPlayers | Squad for selected team |
| `/players` | Players | Searchable player list |
| `/players/:id` | PlayerDetails | Individual player profile |
| `/fixtures` | Fixtures | Match results & upcoming |

---

## 📚 GraphQL Queries Available

```graphql
query {
  teams              # All teams
  players            # All players
  player(id: "1")   # Single player
  fixtures           # All fixtures
  topScorers(limit: 10)  # Top scorers
  positions          # Position types
}
```

See [GRAPHQL_QUERIES.md](./GRAPHQL_QUERIES.md) for full documentation.

---

## 🛠️ Troubleshooting

### Port Already in Use?
```bash
# Windows - Find what's using port 4000
netstat -ano | findstr :4000

# Kill the process or use different port
```

### Backend Won't Connect?
1. Verify backend is running on `:4000`
2. Check Apollo Studio: `http://localhost:4000`
3. Refresh frontend browser
4. Check browser console (F12)

### Data Not Loading?
1. Check backend console for errors
2. Verify FPL API is accessible (external)
3. Wait 5 seconds for initial data fetch
4. Hard refresh (Ctrl+Shift+R)

---

## 📋 File Descriptions

### Backend Files
- **index.js** - GraphQL server, type definitions, resolvers, data fetching
- **package.json** - Backend dependencies (Apollo Server, GraphQL)

### Frontend Files
- **src/App.vue** - Root component with navbar
- **src/main.js** - Vue app initialization with Apollo Client
- **src/router/index.js** - Route definitions
- **src/graphql/queries.js** - All GraphQL query strings
- **src/pages/*.vue** - Page components
- **vite.config.js** - Build tool configuration
- **package.json** - Frontend dependencies

---

## 🎨 Styling

- **Bootstrap 5.3** for responsive framework
- **Custom scoped styles** in Vue components
- **Hover effects** on interactive elements
- **Loading states** with spinners
- **Error alerts** with Bootstrap styling
- **Dark navbar** with responsive menu

---

## ⚙️ How It Works

1. **User** clicks on navbar link or button
2. **Vue Router** navigates to new page
3. **Vue Component** loads and calls Apollo Client
4. **Apollo Client** sends GraphQL query to backend
5. **GraphQL Server** receives query at `:4000`
6. **GraphQL Resolver** fetches data from FPL API or cache
7. **Response** sent back to frontend
8. **Apollo Client** caches result
9. **Vue Component** renders with data

---

## 🎯 Next Steps

1. **Read [QUICK_START.md](./QUICK_START.md)** - Get running in 2 minutes
2. **Start both servers** - Backend and Frontend
3. **Explore the app** - Click through all pages
4. **Check browser console** - See GraphQL requests
5. **Visit Apollo Studio** - Test queries manually
6. **Read PROJECT_STRUCTURE.md** - Understand architecture
7. **Explore the code** - Learn how components work

---

## 📖 Documentation

Complete documentation available:
- 📄 **QUICK_START.md** - Fast setup
- 📄 **SETUP_GUIDE.md** - Detailed setup
- 📄 **PROJECT_STRUCTURE.md** - Architecture
- 📄 **GRAPHQL_QUERIES.md** - API reference
- 📄 **frontend/README.md** - Frontend specifics

---

## ✨ Features Checklist

### Core Features
- [x] Vue 3 frontend with component-based architecture
- [x] GraphQL API with Apollo Server backend
- [x] Bootstrap 5.3 responsive styling
- [x] Vue Router for page navigation
- [x] Apollo Client with smart caching

### Pages
- [x] Home page with welcome & navigation
- [x] Teams page with card layout
- [x] Team players detail page
- [x] Players page with search
- [x] Player details page with profile
- [x] Fixtures page with filtering

### UI Elements
- [x] Responsive navbar
- [x] Card layouts
- [x] Data tables
- [x] Search functionality
- [x] Filter buttons
- [x] Loading states
- [x] Error handling

### Data
- [x] Real FPL data integration
- [x] Smart 5-minute caching
- [x] Nested queries (Teams → Players)
- [x] Top scorers query
- [x] Fixture filtering

---

## 🤝 Contributing

To extend this project:

1. **Add new pages** in `frontend/src/pages/`
2. **Add GraphQL queries** in `frontend/src/graphql/queries.js`
3. **Create components** in `frontend/src/components/`
4. **Update routes** in `frontend/src/router/index.js`

---

## 📞 Support

Need help?
1. Check the troubleshooting section above
2. Review console logs (F12 in browser)
3. Verify both servers are running
4. Check SETUP_GUIDE.md for detailed instructions
5. See PROJECT_STRUCTURE.md for architecture

---

## 🎉 Ready to Go!

You now have a complete, production-ready FPL application!

Start by running [QUICK_START.md](./QUICK_START.md) 

Happy coding! ⚽

---

**Made with ❤️ for Fantasy Premier League fans**
