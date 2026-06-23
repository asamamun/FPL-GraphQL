<template>
  <div class="row">
    <div class="col-md-8 offset-md-2">
      <div class="jumbotron bg-light p-5 rounded">
        <h1 class="display-4">Welcome to FPL Fantasy League</h1>
        <p class="lead">Explore teams, view player statistics, and check out the latest fixtures.</p>
        <hr class="my-4">
        <p class="mb-4">Get started by navigating to one of the sections using the navbar above.</p>
        <router-link to="/teams" class="btn btn-primary btn-lg me-2">
          👥 Browse Teams
        </router-link>
        <router-link to="/players" class="btn btn-info btn-lg me-2">
          ⚽ View Players
        </router-link>
        <router-link to="/fixtures" class="btn btn-success btn-lg">
          📊 Check Fixtures
        </router-link>
      </div>

      <div class="row mt-5">
        <div class="col-md-4 mb-3">
          <div class="card">
            <div class="card-body text-center">
              <h5 class="card-title">🏆 Top Scorers</h5>
              <p class="card-text">View the highest scoring players in the league.</p>
              <router-link to="/players" class="btn btn-sm btn-outline-primary">
                View All
              </router-link>
            </div>
          </div>
        </div>
        <div class="col-md-4 mb-3">
          <div class="card">
            <div class="card-body text-center">
              <h5 class="card-title">⚙️ Team Details</h5>
              <p class="card-text">Explore each team and their squad players.</p>
              <router-link to="/teams" class="btn btn-sm btn-outline-primary">
                View Teams
              </router-link>
            </div>
          </div>
        </div>
        <div class="col-md-4 mb-3">
          <div class="card">
            <div class="card-body text-center">
              <h5 class="card-title">📅 Match Results</h5>
              <p class="card-text">Check completed and upcoming fixtures.</p>
              <router-link to="/fixtures" class="btn btn-sm btn-outline-primary">
                View Fixtures
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home'
}
</script>

<style scoped>
.jumbotron {
  border-left: 5px solid #0d6efd;
}
</style>
