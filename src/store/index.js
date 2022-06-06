import { createStore } from 'vuex'

import navigationData from './navigationData'
import routList from './routsList'

export default createStore({
  modules: {
    navigationData,
    routList
  }
})
