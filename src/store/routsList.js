import axios from 'axios'
const API_URL = 'http://localhost:3000/';

export default {
	namespaced: true,
   state: {
      routLogs: [],
      routeList: [],
      mechanisms: [],
   },
   getters: {
      LOGS : state => state.routLogs,
      ROUTS : state => state.routeList,
      LOGS_BY_ROUTID : state => id =>{
         let rez = state.routLogs.filter(item => item.MesIDRout == id);
         return rez;
      }, 
      MECHANISMS: state => state.mechanisms,
   },
   mutations: {
      SET_ROUT_LOGS(state, data){
         state.routLogs = data;
      },
      SET_ROUTE_LIST(state, data){
         state.routeList = data;
      },
      WRITE_MECHANISMS(state, data){
         state.mechanisms = data;
      }
   },
   actions: {
      async LOAD_ROUT_LOGS({commit}){
         await axios.get(API_URL + 'routLog')
         .then(response=>{
            commit('SET_ROUT_LOGS', response.data);
         });
      },
      async LOAD_ROUTE_LIST({commit}, routeID){
         await axios.get(API_URL + "messages")
         .then(response =>{
            commit('SET_ROUTE_LIST', response.data)
         });
      },
      async LOAD_MECHANISMS({commit}, routeID){
         await axios.get(API_URL + 'deviceList')
         .then(response =>{
            commit('WRITE_MECHANISMS', response.data);
         });
      }
   },
}