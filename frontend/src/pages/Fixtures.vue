<template>
  <div>
    <h1 class="mb-4">📊 Match Fixtures</h1>

    <div v-if="loading" class="alert alert-info" role="alert">
      <div class="spinner-border spinner-border-sm me-2" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
      Loading fixtures...
    </div>

    <div v-else-if="error" class="alert alert-danger" role="alert">
      Error loading fixtures: {{ error.message }}
    </div>

    <div v-else>
      <div class="mb-4">
        <button 
          @click="filterStatus = 'all'" 
          class="btn me-2"
          :class="filterStatus === 'all' ? 'btn-primary' : 'btn-outline-primary'"
        >
          All Matches
        </button>
        <button 
          @click="filterStatus = 'completed'" 
          class="btn me-2"
          :class="filterStatus === 'completed' ? 'btn-success' : 'btn-outline-success'"
        >
          Completed
        </button>
        <button 
          @click="filterStatus = 'upcoming'" 
          class="btn"
          :class="filterStatus === 'upcoming' ? 'btn-warning' : 'btn-outline-warning'"
        >
          Upcoming
        </button>
      </div>

      <div v-if="filteredFixtures.length > 0" class="row">
        <div v-for="fixture in filteredFixtures" :key="fixture.id" class="col-md-6 mb-4">
          <div class="card h-100 shadow-sm" @click="toggleFixtureDetails(fixture.id)" style="cursor: pointer;">
            <div class="card-body">
              <div class="d-flex justify-content-between align-items-start mb-3">
                <div>
                  <small class="text-muted d-block">
                    {{ formatDate(fixture.kickoff_time) }}
                  </small>
                  <span v-if="fixture.finished" class="badge bg-success">Finished</span>
                  <span v-else class="badge bg-warning">Upcoming</span>
                </div>
              </div>

              <div class="match-container">
                <div class="team">
                  <h5 class="team-name">{{ fixture.team_h.short_name }}</h5>
                  <p class="team-full">{{ fixture.team_h.name }}</p>
                </div>

                <div class="score" v-if="fixture.finished">
                  <div class="score-display">
                    <span class="score-value">{{ fixture.team_h_score }}</span>
                    <span class="score-separator">-</span>
                    <span class="score-value">{{ fixture.team_a_score }}</span>
                  </div>
                </div>

                <div class="score" v-else>
                  <div class="score-display">
                    <span class="score-text">vs</span>
                  </div>
                </div>

                <div class="team">
                  <h5 class="team-name">{{ fixture.team_a.short_name }}</h5>
                  <p class="team-full">{{ fixture.team_a.name }}</p>
                </div>
              </div>
            </div>

            <div v-if="expandedFixtures.includes(fixture.id)" class="card-footer bg-light">
              <div class="fixture-details">
                <p class="mb-2">
                  <strong>Home Team:</strong> {{ fixture.team_h.name }}
                </p>
                <p class="mb-2">
                  <strong>Away Team:</strong> {{ fixture.team_a.name }}
                </p>
                <p class="mb-2" v-if="fixture.finished">
                  <strong>Final Score:</strong>
                  <span class="badge bg-success">
                    {{ fixture.team_h_score }} - {{ fixture.team_a_score }}
                  </span>
                </p>
                <p v-else class="mb-0">
                  <strong>Status:</strong> <span class="badge bg-warning">Upcoming</span>
                </p>
                <p class="mb-0 text-muted">
                  <small>Match ID: {{ fixture.id }}</small>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-else class="alert alert-warning" role="alert">
        No fixtures found for the selected filter.
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { request, gql } from 'graphql-request'

const GET_FIXTURES = gql`
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

export default {
  name: 'Fixtures',
  setup() {
    const filterStatus = ref('all')
    const expandedFixtures = ref([])
    const fixtures = ref([])
    const loading = ref(false)
    const error = ref(null)

    const filteredFixtures = computed(() => {
      return fixtures.value.filter(fixture => {
        if (filterStatus.value === 'completed') {
          return fixture.finished
        } else if (filterStatus.value === 'upcoming') {
          return !fixture.finished
        }
        return true
      })
    })

    const formatDate = (dateString) => {
      if (!dateString) return 'TBA'
      const date = new Date(dateString)
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    }

    const toggleFixtureDetails = (fixtureId) => {
      const index = expandedFixtures.value.indexOf(fixtureId)
      if (index > -1) {
        expandedFixtures.value.splice(index, 1)
      } else {
        expandedFixtures.value.push(fixtureId)
      }
    }

    onMounted(async () => {
      loading.value = true
      try {
        const data = await request('http://localhost:4000', GET_FIXTURES)
        fixtures.value = data.fixtures || []
      } catch (e) {
        error.value = e
        console.error('Error fetching fixtures:', e)
      } finally {
        loading.value = false
      }
    })

    return {
      filterStatus,
      expandedFixtures,
      filteredFixtures,
      loading,
      error,
      formatDate,
      toggleFixtureDetails
    }
  }
}
</script>

<style scoped>
.match-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 10px;
  border-radius: 8px;
  background: #f8f9fa;
}

.team {
  flex: 1;
  text-align: center;
}

.team-name {
  font-size: 1.5rem;
  font-weight: bold;
  margin: 0;
}

.team-full {
  font-size: 0.85rem;
  color: #666;
  margin: 5px 0 0 0;
}

.score {
  flex: 0.8;
  text-align: center;
  padding: 0 15px;
}

.score-display {
  font-size: 1.8rem;
  font-weight: bold;
  letter-spacing: 2px;
}

.score-value {
  color: #0d6efd;
}

.score-separator {
  margin: 0 8px;
  color: #666;
}

.score-text {
  color: #999;
  font-size: 1rem;
}

.fixture-details {
  padding: 10px 0;
}

.card {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.card:hover {
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1) !important;
}

.btn.active {
  color: #fff;
}
</style>
