import axios from 'axios'
const API_URL = 'http://localhost:3000/';

export default {
	namespaced: true,
   state: {
      routLogs: []
   },
   getters: {
      GET_ALL_LOGS : state => state.routLogs,
   },
   mutations: {
      SET_ROUT_LOGS(state, data){
         state.routLogs = data;
      }
   },
   actions: {
      async LOAD_ROUT_LOGS({commit}){
         await axios.get(API_URL + 'routLog')
         .then(response=>{
            commit('SET_ROUT_LOGS',response.data);
         });
      }
   },
}