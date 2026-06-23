# FPL Fantasy League - Vue 3 Frontend

A modern Vue 3 application for exploring Fantasy Premier League data with teams, players, and fixtures.

## 🚀 Tech Stack

- **Vue 3** - Progressive JavaScript framework
- **Vue Router** - Client-side routing
- **Apollo Client** - GraphQL client with @vue/apollo-composable
- **Bootstrap 5.3** - CSS framework
- **Vite** - Next generation frontend build tool

## 📁 Project Structure

```
src/
├── components/          # Reusable Vue components
├── pages/              # Page components (Home, Teams, Players, Fixtures, etc.)
├── router/             # Vue Router configuration
├── graphql/            # GraphQL queries
├── App.vue             # Root component
└── main.js             # Application entry point
```

## 📦 Installation

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

## 🏃 Running the Application

### Development Mode
```bash
npm run dev
```
The app will be available at `http://localhost:5173`

### Production Build
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## ⚙️ Prerequisites

1. Make sure your GraphQL backend is running on `http://localhost:4000`
   - Run from the parent directory: `node index.js`

2. Node.js 16+ and npm should be installed

## 📋 Features

### Navbar
- **Teams** - Browse all Premier League teams
- **Players** - View all players with search functionality
- **Fixtures** - Check match results and upcoming fixtures

### Pages

#### Home
- Welcome page with quick links
- Overview of available features

#### Teams
- Display all teams in a card layout
- Click "View Players" to see squad details

#### Team Players
- Show all players in a selected team
- Display player positions and total points
- Navigate to player details

#### Players
- Search players by name
- Table view with sortable columns
- Quick access to player details

#### Player Details
- Detailed player information
- Team affiliation
- Position information
- Total points and rating
- Link to view full squad

#### Fixtures
- Filter fixtures (All, Completed, Upcoming)
- Match scores for completed games
- Fixture details on click
- Team information

## 🔗 GraphQL Queries

The frontend uses the following GraphQL queries:

- `GET_TEAMS` - Fetch all teams
- `GET_TEAM_WITH_PLAYERS` - Fetch team with players
- `GET_PLAYERS` - Fetch all players
- `GET_PLAYER_DETAILS` - Fetch individual player details
- `GET_FIXTURES` - Fetch all fixtures
- `GET_TOP_SCORERS` - Fetch top scoring players

## 🎨 Styling

- Bootstrap 5.3 for responsive design
- Custom scoped styles for components
- Hover effects and transitions
- Dark navbar with responsive menu

## 🚨 Troubleshooting

### Backend not connecting?
- Ensure backend is running on port 4000
- Check that `http://localhost:4000` is accessible
- Verify GraphQL endpoint is working with Apollo Studio

### Data not loading?
- Check browser console for errors
- Verify network tab shows successful GraphQL requests
- Confirm backend API is returning data

### Styling issues?
- Clear browser cache
- Rebuild with `npm run build`
- Check Bootstrap CSS is loaded (inspect in DevTools)

## 📚 Additional Resources

- [Vue 3 Documentation](https://vuejs.org/)
- [Vue Router](https://router.vuejs.org/)
- [Apollo Client Docs](https://www.apollographql.com/docs/react/)
- [Bootstrap 5.3](https://getbootstrap.com/)
- [Vite Documentation](https://vitejs.dev/)

## 📝 Notes

- The backend caches FPL data for 5 minutes to reduce API calls
- All routes are protected with loading and error states
- Search functionality is case-insensitive
- Fixtures can be filtered by completion status
