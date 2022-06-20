import axios from 'axios'
// const API_URL = 'http://localhost:3000/';
const API_URL = 'http://localhost:30094/';

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
      async LOAD_ROUT_LOGS({commit}, routeID){
         await axios.get(API_URL + 'Route/Log',  {params:{MesIDRout: routeID}})
         .then(response=>{
            response.data.forEach(function(item){
               item.LastAccess = new Date(item.LastAccess).toLocaleString().replace(/,+/g, "");
               return item;
            });

            commit('SET_ROUT_LOGS', response.data);
         });
      },
      async LOAD_ROUTE_LIST({commit}){
         await axios.get(API_URL + "Route")
         .then(response =>{
               response.data.forEach(function(item){
               item.StartTime = new Date(item.StartTime).toLocaleString().replace(/,+/g, "")
               item.StopTime = new Date(item.StopTime).toLocaleString().replace(/,+/g, "")

               return item;
            });

            commit('SET_ROUTE_LIST', response.data)
         });
      },
      async LOAD_ROUTE_LIST_BY_TIMERANGE({commit}, timerange){
          let start = timerange.StartDate.toISOString().slice(0, 10);
          let end = timerange.EndDate.toISOString().slice(0, 10);

         await axios.get(API_URL + "Route/Range", {params:{startTime: start, endTime: end}})
         .then(response =>{
               response.data.forEach(function(item){
               item.StartTime = new Date(item.StartTime).toLocaleString().replace(/,+/g, "")
               item.StopTime = new Date(item.StopTime).toLocaleString().replace(/,+/g, "")

               return item;
            });

            commit('SET_ROUTE_LIST', response.data)
         });
      },
      async LOAD_MECHANISMS({commit}, routeID){
         await axios.get(API_URL + 'api/Alg/RoutID', {params:{routID: routeID}})
         .then(response =>{
            commit('WRITE_MECHANISMS', response.data);
         });
      }
   },
}