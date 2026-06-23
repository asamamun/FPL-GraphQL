<template>
  <div>
    <h1 class="mb-4">⚽ All Players</h1>

    <div v-if="loading" class="alert alert-info" role="alert">
      <div class="spinner-border spinner-border-sm me-2" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
      Loading players...
    </div>

    <div v-else-if="error" class="alert alert-danger" role="alert">
      Error loading players: {{ error.message }}
    </div>

    <div v-else>
      <div class="mb-4">
        <input 
          v-model="searchQuery" 
          type="text" 
          class="form-control" 
          placeholder="Search players by name..."
        >
      </div>

      <div class="table-responsive">
        <table class="table table-hover table-striped">
          <thead class="table-dark">
            <tr>
              <th>Name</th>
              <th>Position</th>
              <th>Team</th>
              <th>Points</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="player in filteredPlayers" :key="player.id">
              <td class="fw-bold">{{ player.first_name }} {{ player.second_name }}</td>
              <td>
                <span class="badge bg-info">{{ player.position.singular_name }}</span>
              </td>
              <td>{{ player.team.name }}</td>
              <td>
                <span class="badge" :class="player.total_points > 50 ? 'bg-success' : 'bg-secondary'">
                  {{ player.total_points }}
                </span>
              </td>
              <td>
                <router-link 
                  :to="{ name: 'PlayerDetails', params: { playerId: player.id } }"
                  class="btn btn-sm btn-primary"
                >
                  Details
                </router-link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div v-if="filteredPlayers.length === 0" class="alert alert-warning" role="alert">
        No players found matching your search.
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { request, gql } from 'graphql-request'

const GET_PLAYERS = gql`
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
`

export default {
  name: 'Players',
  setup() {
    const searchQuery = ref('')
    const players = ref([])
    const loading = ref(false)
    const error = ref(null)

    const filteredPlayers = computed(() => {
      return players.value.filter(player => {
        const fullName = `${player.first_name} ${player.second_name}`.toLowerCase()
        return fullName.includes(searchQuery.value.toLowerCase())
      })
    })

    onMounted(async () => {
      loading.value = true
      try {
        const data = await request('http://localhost:4000', GET_PLAYERS)
        players.value = data.players || []
      } catch (e) {
        error.value = e
        console.error('Error fetching players:', e)
      } finally {
        loading.value = false
      }
    })

    return {
      searchQuery,
      filteredPlayers,
      loading,
      error
    }
  }
}
</script>

<style scoped>
.table {
  margin-bottom: 0;
}
</style>
