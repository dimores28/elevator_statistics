import { createStore } from 'vuex'

import navigationData from './navigationData'
import routList from './routslist'

export default createStore({
  modules: {
    navigationData,
    routList
  }
})
