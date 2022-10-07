import { createStore } from 'vuex'


import navigationData from './navigationData'
import routList from './routsList'
import card from './card'
import device from './device'
import sensors from './sensors'
import workingTime from './workingTime'

export default createStore({
  modules: {
    navigationData,
    routList,
    card,
    device,
    sensors,
    workingTime
  },
  strict: process.env.NODE_ENV !== 'production',
})
