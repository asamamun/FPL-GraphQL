<template>
  <div>
    <router-link to="/teams" class="btn btn-secondary mb-3">
      ← Back to Teams
    </router-link>

    <h1 v-if="team" class="mb-4">
      👥 {{ team.name }} Players
    </h1>

    <div v-if="loading" class="alert alert-info" role="alert">
      <div class="spinner-border spinner-border-sm me-2" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
      Loading team players...
    </div>

    <div v-else-if="error" class="alert alert-danger" role="alert">
      Error loading players: {{ error.message }}
    </div>

    <div v-else-if="team && team.players" class="row">
      <div v-for="player in team.players" :key="player.id" class="col-md-6 mb-4">
        <div class="card h-100 shadow-sm">
          <div v-if="player.photo" class="card-img-wrapper" style="background-color: #f0f0f0; height: 200px; overflow: hidden;">
            <img :src="player.photo" class="card-img-top" :alt="`${player.first_name} ${player.second_name}`" style="width: 100%; height: 100%; object-fit: contain;" @error="handleImageError" />
          </div>
          <div v-else class="card-img-wrapper" style="background-color: #f0f0f0; height: 200px; display: flex; align-items: center; justify-content: center;">
            <span class="text-muted">No photo</span>
          </div>
          <div class="card-body">
            <h5 class="card-title">
              {{ player.first_name }} {{ player.second_name }}
            </h5>
            <p class="card-text">
              <span class="badge bg-info">{{ player.position.singular_name }}</span>
            </p>
            <p class="card-text">
              <strong>Total Points:</strong> 
              <span class="text-success fw-bold">{{ player.total_points }}</span>
            </p>
          </div>
          <div class="card-footer bg-white">
            <router-link 
              :to="{ name: 'PlayerDetails', params: { playerId: player.id } }"
              class="btn btn-primary btn-sm w-100"
            >
              View Details →
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="alert alert-warning" role="alert">
      No players found for this team.
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { request, gql } from 'graphql-request'

const GET_TEAM_WITH_PLAYERS = gql`
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

export default {
  name: 'TeamPlayers',
  setup() {
    const route = useRoute()
    const teamId = route.params.teamId
    const team = ref(null)
    const loading = ref(false)
    const error = ref(null)

    onMounted(async () => {
      loading.value = true
      try {
        const data = await request('http://localhost:4000', GET_TEAM_WITH_PLAYERS)
        const matchedTeam = data.teams.find(t => t.id === teamId)
        console.log('Team data:', matchedTeam)
        if (matchedTeam?.players) {
          console.log('First player photo:', matchedTeam.players[0]?.photo)
        }
        team.value = matchedTeam
      } catch (e) {
        error.value = e
        console.error('Error fetching team:', e)
      } finally {
        loading.value = false
      }
    })

    return {
      team,
      loading,
      error,
      handleImageError: (e) => {
        console.error('Image failed to load:', e.target.src);
        e.target.style.display = 'none';
      }
    }
  }
}
</script>

<style scoped>
.card {
  transition: transform 0.3s ease;
}

.card:hover {
  transform: translateY(-3px);
}
</style>
