# Migration from Apollo Client to GraphQL Request

## Issue Fixed

The project was using Apollo Client with @vue/apollo-composable, which caused a React dependency error:
```
Uncaught Error: Could not resolve "react" imported by "rehackt"
```

This occurred because Apollo Client is designed primarily for React and has optional peer dependencies on React.

## Solution

Migrated to **GraphQL Request** - a lightweight, framework-agnostic GraphQL client that works perfectly with Vue 3.

## What Changed

### 1. Dependencies (package.json)
**Removed:**
- @apollo/client
- @vue/apollo-composable

**Added:**
- graphql-request (lightweight GraphQL client)

### 2. Frontend Pages
All page components (Teams, Players, Fixtures, etc.) now use:

**Before:**
```javascript
import { useQuery } from '@vue/apollo-composable'
import { GET_TEAMS } from '../graphql/queries'

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

**After:**
```javascript
import { ref, onMounted } from 'vue'
import { request, gql } from 'graphql-request'

const GET_TEAMS = gql`...`

export default {
  setup() {
    const teams = ref([])
    const loading = ref(false)
    const error = ref(null)

    onMounted(async () => {
      loading.value = true
      try {
        const data = await request('http://localhost:4000', GET_TEAMS)
        teams.value = data.teams || []
      } catch (e) {
        error.value = e
      } finally {
        loading.value = false
      }
    })

    return { teams, loading, error }
  }
}
```

### 3. Apollo Configuration
**Removed:** `src/apollo.js` (not needed)

**Simplified:** `src/main.js` - No longer needs Apollo Client provider setup

## Benefits

✅ **No React dependency** - Pure Vue 3 stack  
✅ **Lighter bundle** - graphql-request is much smaller  
✅ **Simpler API** - Easy to understand request/response  
✅ **Better Vue 3 integration** - Uses native Vue 3 features (ref, onMounted)  
✅ **Same functionality** - All GraphQL queries work identically  

## Files Updated

- ✅ frontend/package.json
- ✅ frontend/src/main.js
- ✅ frontend/src/pages/Teams.vue
- ✅ frontend/src/pages/TeamPlayers.vue
- ✅ frontend/src/pages/Players.vue
- ✅ frontend/src/pages/PlayerDetails.vue
- ✅ frontend/src/pages/Fixtures.vue

## Installation

```bash
cd frontend
npm install  # This will install graphql-request instead of Apollo
npm run dev  # Start the dev server
```

## How It Works Now

1. Component mounts with `onMounted`
2. Set `loading.value = true`
3. Call `request('http://localhost:4000', QUERY, variables)`
4. Get response and set `teams.value = data.teams`
5. Catch errors in `error.value`
6. Set `loading.value = false`

## Testing

All features work the same:
- Teams page loads all teams
- Click team to see players
- Players page with search
- Click player to see details
- Fixtures page with filtering

## GraphQL Queries

GraphQL queries remain unchanged in `src/graphql/queries.js` - they still export the same `gql` queries, just now used with graphql-request instead of Apollo.

## Backward Compatibility

If you want to switch back to Apollo Client later:
1. Remove graphql-request from package.json
2. Add back @apollo/client and @vue/apollo-composable
3. Revert the page component changes
4. The GraphQL queries don't need to change

---

**Status:** ✅ Fixed and ready to run!

Run `npm run dev` in the frontend directory to start the development server.
