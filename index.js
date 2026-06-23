const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');

const typeDefs = `#graphql
  type Team {
    id: ID!
    name: String!
    short_name: String!
    players: [Player!]!  
  }

  type Position {
    id: ID!
    singular_name: String!
    plural_name: String!
  }

  type Player {
    id: ID!
    first_name: String!
    second_name: String!
    total_points: Int!
    team: Team! 
    position: Position!
    photo: String
  }

  # 🆕 1. DEFINE THE NEW FIXTURE TYPE
  type Fixture {
    id: ID!
    kickoff_time: String
    team_h_score: Int
    team_a_score: Int
    finished: Boolean!
    team_h: Team!  # GraphQL will automatically turn the ID into a Team object!
    team_a: Team!  # GraphQL will automatically turn the ID into a Team object!
  }

  type Query {
    teams: [Team!]!
    positions: [Position!]!
    players: [Player!]!
    player(id: ID!): Player
    fixtures: [Fixture!]! # 🆕 2. ADD FIXTURES TO THE QUERY MENU
    topScorers(limit: Int = 10): [Player!]! # 🆕 ADD THIS LINE
  }
`;

let fplData = null;
let lastFetched = 0;
const CACHE_TTL = 1000 * 60 * 5; // Refresh every 5 minutes

async function getFplData() {
  if (!fplData || Date.now() - lastFetched > CACHE_TTL) {
    console.log("Fetching fresh FPL bootstrap data...");
    const response = await fetch('https://fantasy.premierleague.com/api/bootstrap-static/', {
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
    });
    
    if (!response.ok) {
      throw new Error(`FPL API responded with status: ${response.status}`);
    }
    
    const rawData = await response.json();

    // 🆕 3. FETCH THE FIXTURES FROM THE SECOND API ENDPOINT
    console.log("Fetching fresh FPL fixtures data...");
    const fixturesResponse = await fetch('https://fantasy.premierleague.com/api/fixtures/', {
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
    });
    if (!fixturesResponse.ok) {
      throw new Error(`FPL Fixtures API responded with status: ${fixturesResponse.status}`);
    }
    const fixtures = await fixturesResponse.json();
    
    // Create the maps for O(1) lookups!
    const teamsMap = {};
    rawData.teams.forEach(t => { teamsMap[t.id] = t; });
    
    const positionsMap = {};
    rawData.element_types.forEach(p => { positionsMap[p.id] = p; });

    // Attach the maps AND the new fixtures to the data object
    fplData = {
      ...rawData,
      fixtures, // 🆕 Added to the cached data
      teamsMap,
      positionsMap
    };
    
    lastFetched = Date.now();
  }
  return fplData;
}

const resolvers = {
  Query: {
    teams: async () => (await getFplData()).teams,
    positions: async () => (await getFplData()).element_types,
    players: async () => (await getFplData()).elements,
    player: async (_, { id }) => (await getFplData()).elements.find(p => p.id === parseInt(id)),
    fixtures: async () => (await getFplData()).fixtures, // 🆕 Tell GraphQL how to get the list of fixtures
  // 🆕 ADD THIS NEW RESOLVER
    topScorers: async (_, { limit = 5 }) => {
      const data = await getFplData();      
      // 1. [...data.elements] creates a copy so we don't mutate the cache!
      // 2. .sort((a, b) => b.total_points - a.total_points) sorts highest to lowest.
      const sortedPlayers = [...data.elements].sort((a, b) => b.total_points - a.total_points);
      
      // 3. .slice(0, limit) grabs the top 'limit' players (default is 5)
      return sortedPlayers.slice(0, limit);
    }
  },
  Player: {
    team: async (parent) => (await getFplData()).teamsMap[parent.team],
    position: async (parent) => (await getFplData()).positionsMap[parent.element_type],
    photo: (parent) => {
      if (parent.code) {
        return `https://resources.premierleague.com/premierleague25/photos/players/110x140/${parent.code}.png`;
      }
      return null;
    }
  },
  Team: {
    players: async (parent) => {
      const data = await getFplData();
      return data.elements.filter(p => p.team_code === parent.code);
    }
  },
  // 🆕 4. TELL GRAPHQL HOW TO TURN THE team_h AND team_a IDs INTO TEAM OBJECTS
  Fixture: {
    team_h: async (parent) => (await getFplData()).teamsMap[parent.team_h],
    team_a: async (parent) => (await getFplData()).teamsMap[parent.team_a]
  }
};

const server = new ApolloServer({ typeDefs, resolvers });

startStandaloneServer(server, { listen: { port: 4000 } }).then(({ url }) => {
  console.log(`🚀 FPL GraphQL API ready at: ${url}`);
});

/*

Fetched raw data from a third-party REST API.
Cached it so you don't spam the FPL servers.
Optimized the lookups using O(1) Maps.
Created a two-way "Graph" (Players know their Teams, Teams know their Players).
Returned exactly the nested shape of data you asked for, with zero extra bloat.

query {
  fixtures {
    kickoff_time
    finished
    team_h_score
    team_a_score
    team_h {
      name
      short_name
    }
    team_a {
      name
      short_name
    }
  }
}



query {
  # Because we set a default of 5, we don't even need to pass an argument!
  topScorers {
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

*/