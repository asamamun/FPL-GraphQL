<template>
  <div>
    <h1 class="mb-4">🏆 Premier League Teams</h1>
    
    <div v-if="loading" class="alert alert-info" role="alert">
      <div class="spinner-border spinner-border-sm me-2" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
      Loading teams...
    </div>

    <div v-else-if="error" class="alert alert-danger" role="alert">
      Error loading teams: {{ error.message }}
    </div>

    <div v-else class="row">
      <div v-for="team in teams" :key="team.id" class="col-md-4 mb-4">
        <div class="card h-100 shadow-sm hover-card" style="cursor: pointer;">
          <div class="card-body">
            <h5 class="card-title">{{ team.name }}</h5>
            <p class="card-text text-muted">{{ team.short_name }}</p>
          </div>
          <div class="card-footer bg-white">
            <router-link 
              :to="{ name: 'TeamPlayers', params: { teamId: team.id } }"
              class="btn btn-primary btn-sm w-100"
            >
              View Players →
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { request, gql } from 'graphql-request'

const GET_TEAMS = gql`
  query {
    teams {
      id
      name
      short_name
    }
  }
`

export default {
  name: 'Teams',
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
        console.error('Error fetching teams:', e)
      } finally {
        loading.value = false
      }
    })

    return {
      teams,
      loading,
      error
    }
  }
}
</script>

<style scoped>
.hover-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.hover-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1) !important;
}
</style>
