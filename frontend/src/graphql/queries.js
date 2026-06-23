import { gql } from '@apollo/client'

export const GET_TEAMS = gql`
  query {
    teams {
      id
      name
      short_name
    }
  }
`

export const GET_TEAM_WITH_PLAYERS = gql`
  query GetTeamWithPlayers {
    teams {
      id
      name
      short_name
      players {
        id
        first_name
        second_name
        total_points
        photo
        position {
          singular_name
        }
      }
    }
  }
`

export const GET_PLAYERS = gql`
  query {
    players {
      id
      first_name
      second_name
      total_points
      photo
      team {
        id
        name
      }
      position {
        singular_name
      }
    }
  }
`

export const GET_PLAYER_DETAILS = gql`
  query GetPlayerDetails($playerId: ID!) {
    player(id: $playerId) {
      id
      first_name
      second_name
      total_points
      photo
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
`

export const GET_FIXTURES = gql`
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
`

export const GET_TOP_SCORERS = gql`
  query GetTopScorers($limit: Int) {
    topScorers(limit: $limit) {
      id
      first_name
      second_name
      total_points
      photo
      team {
        name
      }
      position {
        singular_name
      }
    }
  }
`
