<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container-fluid">
        <router-link to="/" class="navbar-brand fw-bold">
          ⚽ FPL Fantasy League
        </router-link>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ms-auto">
            <li class="nav-item">
              <router-link to="/teams" class="nav-link" :class="{ active: $route.path.includes('teams') }">
                Teams
              </router-link>
            </li>
            <li class="nav-item">
              <router-link to="/players" class="nav-link" :class="{ active: $route.path.includes('players') }">
                Players
              </router-link>
            </li>
            <li class="nav-item">
              <router-link to="/fixtures" class="nav-link" :class="{ active: $route.path.includes('fixtures') }">
                Fixtures
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <div class="container-fluid mt-4">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style scoped>
.navbar {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>
