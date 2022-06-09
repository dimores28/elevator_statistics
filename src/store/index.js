import { createStore } from 'vuex'


import navigationData from './navigationData'
import routList from './routsList'
import card from './card'
import device from './device'

export default createStore({
  modules: {
    navigationData,
    routList,
    card,
    device
  },
  strict: process.env.NODE_ENV !== 'production',
})
