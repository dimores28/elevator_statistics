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
    component: () => import( '../views/SensorsViews')
  },
  {
    path: '/more-sensor/:id',
    name: 'more-sensor',
    component: () => import( '../views/detail/MoreSensorView')
  },
  {
    path: '/card/:type',
    name: 'card',
    component: () => import( '../views/CardViews')
  },
  {
    path: '/details/:id',
    name: 'details',
    component: () => import( '../views/detail/DeviceStatusView')
  },
  {
    path: '/more-rout/:id',
    name: 'rout',
    component: () => import( '../views/detail/MoreRoutView')
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
