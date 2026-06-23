# Project Structure Overview

## 📁 Complete Directory Tree

```
FPL-graphQL/
│
├── 📄 index.js                          ← GraphQL Apollo Server
├── 📄 package.json                      ← Backend dependencies
├── 📄 package-lock.json                 ← Backend lock file
├── 📄 SETUP_GUIDE.md                    ← Complete setup instructions
├── 📄 PROJECT_STRUCTURE.md              ← This file
│
└── 📂 frontend/                         ← Vue 3 Frontend Application
    │
    ├── 📄 package.json                  ← Frontend dependencies
    ├── 📄 package-lock.json             ← Frontend lock file (generated)
    ├── 📄 vite.config.js                ← Vite configuration
    ├── 📄 index.html                    ← HTML entry point
    ├── 📄 .gitignore                    ← Git ignore rules
    ├── 📄 README.md                     ← Frontend documentation
    │
    ├── 📂 src/                          ← Source code
    │   │
    │   ├── 📄 main.js                   ← Application entry point
    │   ├── 📄 App.vue                   ← Root Vue component with Navbar
    │   ├── 📄 apollo.js                 ← Apollo Client configuration
    │   │
    │   ├── 📂 router/                   ← Vue Router
    │   │   └── 📄 index.js              ← Route definitions
    │   │       Routes:
    │   │       - / (Home)
    │   │       - /teams (Teams list)
    │   │       - /teams/:teamId (Team players)
    │   │       - /players (All players)
    │   │       - /players/:playerId (Player details)
    │   │       - /fixtures (Fixtures)
    │   │
    │   ├── 📂 graphql/                  ← GraphQL Queries
    │   │   └── 📄 queries.js            ← All GraphQL query definitions
    │   │       - GET_TEAMS
    │   │       - GET_TEAM_WITH_PLAYERS
    │   │       - GET_PLAYERS
    │   │       - GET_PLAYER_DETAILS
    │   │       - GET_FIXTURES
    │   │       - GET_TOP_SCORERS
    │   │
    │   ├── 📂 pages/                    ← Page Components
    │   │   ├── 📄 Home.vue              ← Home page with overview
    │   │   ├── 📄 Teams.vue             ← All teams listing
    │   │   ├── 📄 TeamPlayers.vue       ← Team's squad view
    │   │   ├── 📄 Players.vue           ← All players with search
    │   │   ├── 📄 PlayerDetails.vue     ← Individual player info
    │   │   └── 📄 Fixtures.vue          ← Match fixtures & results
    │   │
    │   └── 📂 components/               ← Reusable Components (empty, ready for expansion)
    │
    └── 📂 node_modules/                 ← Dependencies (auto-generated after npm install)
```

## 🔄 Data Flow Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    USER BROWSER                             │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │           Vue 3 Application (Port 5173)             │  │
│  │                                                      │  │
│  │  ┌────────────────────────────────────────────────┐ │  │
│  │  │  App.vue (Navbar + Router)                     │ │  │
│  │  │  ┌──────────────────────────────────────────┐ │ │  │
│  │  │  │ Pages:                                   │ │ │  │
│  │  │  │ • Home                                   │ │ │  │
│  │  │  │ • Teams (card layout)                    │ │ │  │
│  │  │  │ • TeamPlayers (squad view)               │ │ │  │
│  │  │  │ • Players (searchable table)             │ │ │  │
│  │  │  │ • PlayerDetails (profile)                │ │ │  │
│  │  │  │ • Fixtures (match results)               │ │ │  │
│  │  │  └──────────────────────────────────────────┘ │ │  │
│  │  │                                                │ │  │
│  │  │  Apollo Client (GraphQL Client)               │ │  │
│  │  │  └─> queries.js (All GraphQL queries)         │ │  │
│  │  └────────────────────────────────────────────────┘ │  │
│  │                                                      │  │
│  │  Bootstrap 5.3 (Styling)                            │  │
│  └──────────────────────────────────────────────────────┘  │
│                           ⬇️                                 │
│                   HTTP GraphQL Request                      │
│                                                             │
└─────────────────────────────────────────────────────────────┘
                           ⬇️ ⬆️
             ┌──────────────────────────────┐
             │   Apollo Server              │
             │   (Port 4000)                │
             │                              │
             │ GraphQL Resolvers:           │
             │ • teams()                    │
             │ • players()                  │
             │ • fixtures()                 │
             │ • topScorers()               │
             │ • player(id)                 │
             │ • team(id)                   │
             │                              │
             │ Caching: 5 minutes           │
             └──────────────────────────────┘
                           ⬇️ ⬆️
             ┌──────────────────────────────┐
             │  Fantasy Premier League API  │
             │  (External REST API)         │
             │                              │
             │ • Bootstrap data             │
             │ • Team info                  │
             │ • Player stats               │
             │ • Fixture results            │
             └──────────────────────────────┘
```

## 📊 Component Hierarchy

```
App.vue (Root)
│
├── Navbar
│   ├── Router Links
│   │   ├── Teams
│   │   ├── Players
│   │   └── Fixtures
│   └── Mobile Toggle
│
└── router-view (Dynamic Page Content)
    │
    ├── Home.vue
    │   ├── Jumbotron
    │   └── Feature Cards
    │
    ├── Teams.vue
    │   └── Team Cards
    │       └── router-link → TeamPlayers
    │
    ├── TeamPlayers.vue
    │   └── Player Cards
    │       └── router-link → PlayerDetails
    │
    ├── Players.vue
    │   ├── Search Input
    │   └── Players Table
    │       └── router-link → PlayerDetails
    │
    ├── PlayerDetails.vue
    │   ├── Profile Card
    │   ├── Team Info
    │   ├── Position Info
    │   └── Rating Card
    │
    └── Fixtures.vue
        ├── Filter Buttons
        └── Fixture Cards
            └── Expandable Details
```

## 🔌 GraphQL Schema (Backend)

```graphql
# Types
type Team {
  id: ID!
  name: String!
  short_name: String!
  players: [Player!]!
}

type Player {
  id: ID!
  first_name: String!
  second_name: String!
  total_points: Int!
  team: Team!
  position: Position!
}

type Position {
  id: ID!
  singular_name: String!
  plural_name: String!
}

type Fixture {
  id: ID!
  kickoff_time: String
  team_h_score: Int
  team_a_score: Int
  finished: Boolean!
  team_h: Team!
  team_a: Team!
}

# Root Query
type Query {
  teams: [Team!]!                          # Get all teams
  team(id: ID!): Team                      # Get single team
  players: [Player!]!                      # Get all players
  player(id: ID!): Player                  # Get single player
  positions: [Position!]!                  # Get all positions
  fixtures: [Fixture!]!                    # Get all fixtures
  topScorers(limit: Int = 10): [Player!]! # Get top scoring players
}
```

## 📋 Frontend Dependencies

```json
{
  "dependencies": {
    "vue": "^3.4.0",              // Vue 3 framework
    "vue-router": "^4.3.0",       // Routing
    "@apollo/client": "^3.8.0",   // GraphQL client
    "@vue/apollo-composable": "^4.1.0", // Vue hooks for Apollo
    "graphql": "^16.14.0",        // GraphQL
    "bootstrap": "^5.3.0"         // CSS framework
  },
  "devDependencies": {
    "@vitejs/plugin-vue": "^5.0.0", // Vite Vue plugin
    "vite": "^5.0.0"               // Build tool
  }
}
```

## 🌍 Routes (Frontend Routing)

```
/                          → Home.vue
/teams                     → Teams.vue (all teams)
/teams/:teamId            → TeamPlayers.vue (team's players)
/players                  → Players.vue (all players, searchable)
/players/:playerId        → PlayerDetails.vue (player profile)
/fixtures                 → Fixtures.vue (all matches)
```

## 🎯 Key Features by Page

| Page | Features | Data Source |
|------|----------|------------|
| **Home** | Welcome, navigation cards | Static |
| **Teams** | Card layout, team list | GET_TEAMS query |
| **TeamPlayers** | Squad list, clickable players | GET_TEAM_WITH_PLAYERS query |
| **Players** | Searchable table, all players | GET_PLAYERS query |
| **PlayerDetails** | Profile, stats, team link | GET_PLAYER_DETAILS query |
| **Fixtures** | Filter (All/Completed/Upcoming) | GET_FIXTURES query |

## 🔑 Key Technologies

| Tech | Purpose | Version |
|------|---------|---------|
| Vue 3 | Frontend framework | ^3.4.0 |
| Vue Router | Page routing | ^4.3.0 |
| Apollo Client | GraphQL client | ^3.8.0 |
| @vue/apollo-composable | Vue hooks | ^4.1.0 |
| GraphQL | Query language | ^16.14.0 |
| Bootstrap | CSS framework | ^5.3.0 |
| Vite | Build tool | ^5.0.0 |

## 🚀 Startup Order

```
1. npm install                (in backend directory)
   ↓
2. node index.js              (starts GraphQL server on :4000)
   ↓
3. cd frontend && npm install  (in frontend directory)
   ↓
4. npm run dev                (starts dev server on :5173)
   ↓
5. Open http://localhost:5173 (in browser)
```

## 📝 File Purposes Quick Reference

| File | Purpose |
|------|---------|
| **index.js** | GraphQL server, type definitions, resolvers |
| **App.vue** | Root component, navbar, layout |
| **main.js** | Vue app initialization, Apollo setup |
| **router/index.js** | Route definitions |
| **graphql/queries.js** | GraphQL query strings |
| **pages/*.vue** | Page components |
| **vite.config.js** | Build configuration |

---

This structure provides a complete, modern full-stack application with clear separation of concerns and easy navigation!
