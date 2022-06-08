import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'routes',
    component: () => import( '../views/RoutsViews')
  },
  {
    path: '/sensors',
    name: 'sensors',
    component: () => import( '../views/RoutsViews')
  },
  {
    path: '/card/:type',
    name: 'card',
    component: () => import( '../views/CardViews')
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
