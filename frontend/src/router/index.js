import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import Teams from '../pages/Teams.vue'
import Players from '../pages/Players.vue'
import Fixtures from '../pages/Fixtures.vue'
import TeamPlayers from '../pages/TeamPlayers.vue'
import PlayerDetails from '../pages/PlayerDetails.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/teams',
    name: 'Teams',
    component: Teams
  },
  {
    path: '/teams/:teamId',
    name: 'TeamPlayers',
    component: TeamPlayers
  },
  {
    path: '/players',
    name: 'Players',
    component: Players
  },
  {
    path: '/players/:playerId',
    name: 'PlayerDetails',
    component: PlayerDetails
  },
  {
    path: '/fixtures',
    name: 'Fixtures',
    component: Fixtures
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
