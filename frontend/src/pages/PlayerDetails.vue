<template>
  <div>
    <router-link to="/players" class="btn btn-secondary mb-3">
      ← Back to Players
    </router-link>

    <div v-if="loading" class="alert alert-info" role="alert">
      <div class="spinner-border spinner-border-sm me-2" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
      Loading player details...
    </div>

    <div v-else-if="error" class="alert alert-danger" role="alert">
      Error loading player: {{ error.message }}
    </div>

    <div v-else-if="player" class="row">
      <div class="col-md-8">
        <div class="card shadow-lg mb-4">
          <div class="card-header bg-primary text-white">
            <h1 class="card-title mb-0">
              {{ player.first_name }} {{ player.second_name }}
            </h1>
          </div>
          <div class="card-body">
            <div class="row mb-4">
              <div class="col-md-6">
                <h5 class="text-muted">Team</h5>
                <p class="fs-5 fw-bold">
                  {{ player.team.name }}
                  <span class="badge bg-secondary ms-2">{{ player.team.short_name }}</span>
                </p>
              </div>
              <div class="col-md-6">
                <h5 class="text-muted">Position</h5>
                <p class="fs-5 fw-bold">
                  <span class="badge bg-info">{{ player.position.singular_name }}</span>
                </p>
              </div>
            </div>

            <hr>

            <div class="row">
              <div class="col-md-6">
                <h5 class="text-muted">Total Points</h5>
                <p class="fs-3 fw-bold text-success">{{ player.total_points }}</p>
              </div>
              <div class="col-md-6">
                <h5 class="text-muted">Position (Full)</h5>
                <p class="fs-5">{{ player.position.plural_name }}</p>
              </div>
            </div>
          </div>
          <div class="card-footer bg-light">
            <small class="text-muted">
              Player ID: {{ player.id }}
            </small>
          </div>
        </div>

        <router-link 
          :to="{ name: 'TeamPlayers', params: { teamId: player.team.id } }"
          class="btn btn-outline-primary me-2"
        >
          View {{ player.team.name }} Squad
        </router-link>
      </div>

      <div class="col-md-4">
        <div v-if="player.photo" class="card mb-3">
          <div class="card-body text-center" style="background-color: #f0f0f0; padding: 20px;">
            <img :src="player.photo" :alt="`${player.first_name} ${player.second_name}`" style="width: 100%; max-height: 300px; object-fit: contain;" @error="handleImageError" />
          </div>
        </div>

        <div class="card bg-light mb-3">
          <div class="card-body text-center">
            <h5 class="card-title">⭐ Rating</h5>
            <div class="display-4 text-success fw-bold mb-3">
              {{ Math.round((player.total_points / 5)) }}
            </div>
            <p class="card-text text-muted">Based on total points</p>
          </div>
        </div>

        <div class="card text-center">
          <div class="card-body">
            <h6 class="card-title">Position Stats</h6>
            <p class="card-text">
              <span class="badge bg-info fs-6">
                {{ player.position.singular_name }}
              </span>
            </p>
            <small class="text-muted">
              {{ player.position.plural_name }}
            </small>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="alert alert-warning" role="alert">
      Player not found.
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { request, gql } from 'graphql-request'

const GET_PLAYER_DETAILS = gql`
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

export default {
  name: 'PlayerDetails',
  setup() {
    const route = useRoute()
    const playerId = route.params.playerId
    const player = ref(null)
    const loading = ref(false)
    const error = ref(null)

    onMounted(async () => {
      loading.value = true
      try {
        const data = await request('http://localhost:4000', GET_PLAYER_DETAILS, {
          playerId: playerId
        })
        player.value = data.player
      } catch (e) {
        error.value = e
        console.error('Error fetching player:', e)
      } finally {
        loading.value = false
      }
    })

    return {
      player,
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
  border: none;
}

.card-header {
  border-bottom: 3px solid #0d6efd;
}
</style>
