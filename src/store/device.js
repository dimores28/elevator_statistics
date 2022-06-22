import axios from 'axios'
// const API_URL = 'http://localhost:3000/';
const API_URL = 'http://localhost:30094/';

export default {
	namespaced: true,
   state: {
      messages: [],
      routeList: [],
   },
   getters: {
      MESSAGES: state => state.messages,
      MESSAGES_BY_ID: (state) => (id) => {
         let messages = state.messages.filter(item => item.dev_id == id);
         return messages;
      },
      ROUTE_LIST : state => state.routeList,
   },
   mutations: {
      SET_MESSAGES(state, data){
         state.messages = data;
      },
      SET_ROUTE_LIST(state, data){
         state.routeList = data;
      }
   },
   actions: {
      async LOAD({commit}, device){
         let start = device.range.StartDate.toISOString().slice(0, 10);
         let end = device.range.EndDate.toISOString().slice(0, 10);
         await axios.get(API_URL + 'api/Alg/DeviceRenge', 
         {
            params:{
               byID: device.id,
               startTime: start,
               endTime: end
         }})
         .then((response)=>{
            response.data.forEach(function(item){
               item.DateTime = new Date(item.DateTime).toLocaleString().replace(/,+/g, "");
               return item;
            });
            commit('SET_MESSAGES', response.data);
         });
      },
      async GET_LIST_OF_ROUTES({commit}, device){
         let start = device.range.StartDate.toISOString().slice(0, 10);
         let end = device.range.EndDate.toISOString().slice(0, 10);

         await axios.get(API_URL + 'api/Alg/PresenceRoute',{
            params:{
               deviceID: device.id,
               startTime: start,
               endTime: end,
            }
         })
         .then(response=>{
            commit('SET_ROUTE_LIST', response.data);
         });
      }
   },
}