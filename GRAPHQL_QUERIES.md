# GraphQL Queries Reference

All queries available through the GraphQL backend at `http://localhost:4000`

## 🎮 Interactive Testing

You can test these queries in **Apollo Studio** at:
```
http://localhost:4000
```

---

## 📋 Available Queries

### 1. Get All Teams

```graphql
query {
  teams {
    id
    name
    short_name
  }
}
```

**Response:**
```json
{
  "data": {
    "teams": [
      { "id": "1", "name": "Arsenal", "short_name": "ARS" },
      { "id": "2", "name": "Aston Villa", "short_name": "AVL" },
      // ... more teams
    ]
  }
}
```

---

### 2. Get Team with Players

```graphql
query GetTeamWithPlayers($teamId: ID!) {
  team(id: $teamId) {
    id
    name
    short_name
    players {
      id
      first_name
      second_name
      total_points
      position {
        singular_name
      }
    }
  }
}
```

**Variables:**
```json
{
  "teamId": "1"
}
```

**Response:**
```json
{
  "data": {
    "team": {
      "id": "1",
      "name": "Arsenal",
      "short_name": "ARS",
      "players": [
        {
          "id": "1",
          "first_name": "Aaron",
          "second_name": "Ramsdale",
          "total_points": 145,
          "position": { "singular_name": "Goalkeeper" }
        },
        // ... more players
      ]
    }
  }
}
```

---

### 3. Get All Players

```graphql
query {
  players {
    id
    first_name
    second_name
    total_points
    team {
      id
      name
    }
    position {
      singular_name
    }
  }
}
```

**Response:**
```json
{
  "data": {
    "players": [
      {
        "id": "1",
        "first_name": "Aaron",
        "second_name": "Ramsdale",
        "total_points": 145,
        "team": { "id": "1", "name": "Arsenal" },
        "position": { "singular_name": "Goalkeeper" }
      },
      // ... 600+ players
    ]
  }
}
```

---

### 4. Get Single Player Details

```graphql
query GetPlayerDetails($playerId: ID!) {
  player(id: $playerId) {
    id
    first_name
    second_name
    total_points
    team {
      id
      name
      short_name
    }
    position {
      singular_name
      plural_name
    }
  }
}
```

**Variables:**
```json
{
  "playerId": "1"
}
```

**Response:**
```json
{
  "data": {
    "player": {
      "id": "1",
      "first_name": "Aaron",
      "second_name": "Ramsdale",
      "total_points": 145,
      "team": {
        "id": "1",
        "name": "Arsenal",
        "short_name": "ARS"
      },
      "position": {
        "singular_name": "Goalkeeper",
        "plural_name": "Goalkeepers"
      }
    }
  }
}
```

---

### 5. Get All Fixtures

```graphql
query {
  fixtures {
    id
    kickoff_time
    finished
    team_h_score
    team_a_score
    team_h {
      id
      name
      short_name
    }
    team_a {
      id
      name
      short_name
    }
  }
}
```

**Response:**
```json
{
  "data": {
    "fixtures": [
      {
        "id": "1",
        "kickoff_time": "2024-08-16T20:00:00Z",
        "finished": true,
        "team_h_score": 2,
        "team_a_score": 1,
        "team_h": {
          "id": "1",
          "name": "Arsenal",
          "short_name": "ARS"
        },
        "team_a": {
          "id": "2",
          "name": "Aston Villa",
          "short_name": "AVL"
        }
      },
      // ... more fixtures
    ]
  }
}
```

---

### 6. Get Top Scorers

```graphql
query GetTopScorers($limit: Int) {
  topScorers(limit: $limit) {
    id
    first_name
    second_name
    total_points
    team {
      name
    }
    position {
      singular_name
    }
  }
}
```

**Variables:**
```json
{
  "limit": 10
}
```

**Response:**
```json
{
  "data": {
    "topScorers": [
      {
        "id": "123",
        "first_name": "Erling",
        "second_name": "Haaland",
        "total_points": 285,
        "team": { "name": "Manchester City" },
        "position": { "singular_name": "Forward" }
      },
      // ... top 10 scorers
    ]
  }
}
```

---

### 7. Get All Positions

```graphql
query {
  positions {
    id
    singular_name
    plural_name
  }
}
```

**Response:**
```json
{
  "data": {
    "positions": [
      { "id": "1", "singular_name": "Goalkeeper", "plural_name": "Goalkeepers" },
      { "id": "2", "singular_name": "Defender", "plural_name": "Defenders" },
      { "id": "3", "singular_name": "Midfielder", "plural_name": "Midfielders" },
      { "id": "4", "singular_name": "Forward", "plural_name": "Forwards" }
    ]
  }
}
```

---

## 🔌 Frontend Usage

All these queries are already defined in `frontend/src/graphql/queries.js` and ready to use with `@vue/apollo-composable`:

```javascript
// In any Vue component
import { useQuery } from '@vue/apollo-composable'
import { GET_TEAMS } from '@/graphql/queries'

export default {
  setup() {
    const { result, loading, error } = useQuery(GET_TEAMS)
    
    return {
      teams: () => result.value?.teams || [],
      loading,
      error
    }
  }
}
```

---

## 📊 Data Structure

### Team Object
```json
{
  "id": "1",
  "name": "Arsenal",
  "short_name": "ARS",
  "players": [Player]
}
```

### Player Object
```json
{
  "id": "1",
  "first_name": "Aaron",
  "second_name": "Ramsdale",
  "total_points": 145,
  "team": Team,
  "position": Position
}
```

### Fixture Object
```json
{
  "id": "1",
  "kickoff_time": "2024-08-16T20:00:00Z",
  "team_h_score": 2,
  "team_a_score": 1,
  "finished": true,
  "team_h": Team,
  "team_a": Team
}
```

### Position Object
```json
{
  "id": "1",
  "singular_name": "Goalkeeper",
  "plural_name": "Goalkeepers"
}
```

---

## 🔍 Query Examples for Frontend

### Get Teams for Navbar
```graphql
query {
  teams {
    id
    name
    short_name
  }
}
```

### Get Filtered Fixtures (Completed Only)
```graphql
query {
  fixtures {
    id
    kickoff_time
    finished
    team_h_score
    team_a_score
    team_h { name }
    team_a { name }
  }
}
```
*Then filter in Vue: `fixtures.filter(f => f.finished)`*

### Search Players
```graphql
query {
  players {
    id
    first_name
    second_name
    total_points
    team { name }
    position { singular_name }
  }
}
```
*Then filter in Vue: `players.filter(p => fullName.includes(search))`*

---

## ⚙️ Caching

- Backend caches FPL API data for **5 minutes**
- First query fetches from FPL API
- Subsequent queries use cached data
- Cache expires and refreshes after 5 minutes

---

## 🌐 Frontend Integrations

| Page | Query Used | Usage |
|------|-----------|-------|
| Teams | `GET_TEAMS` | Display all teams |
| TeamPlayers | `GET_TEAM_WITH_PLAYERS` | Show squad for selected team |
| Players | `GET_PLAYERS` | List all players, enable search |
| PlayerDetails | `GET_PLAYER_DETAILS` | Show individual player profile |
| Fixtures | `GET_FIXTURES` | Display all matches, filter by status |
| Home | `GET_TOP_SCORERS` | Could show top scorers widget |

---

## 📝 Notes

- All IDs are returned as strings
- Total points are integers
- Scores (team_h_score, team_a_score) are null for upcoming fixtures
- Timestamps are in ISO 8601 format (UTC)
- Team IDs are 1-20 (20 Premier League teams)
- Player IDs are typically 1-600+ (varies by season)
- Position IDs: 1=GK, 2=DEF, 3=MID, 4=FWD

---

## 🧪 Testing Queries

1. Go to `http://localhost:4000`
2. Click on "Explorer" or use the query editor
3. Paste any query above
4. Click the play button
5. View results in the panel

---

Happy querying! 🚀
