import { createStore } from 'vuex'


import navigationData from './navigationData'
import routList from './routsList'
import card from './card'

export default createStore({
  modules: {
    navigationData,
    routList,
    card
  },
  strict: process.env.NODE_ENV !== 'production',
})
