import axios from 'axios'
// const API_URL = 'http://localhost:3000/';
const API_URL = 'http://localhost:30094/';

export default {
	namespaced: true,
   state: {
      messages: [],
   },
   getters: {
      MESSAGES: state => state.messages,
      MESSAGES_BY_ID: (state) => (id) => {
         let messages = state.messages.filter(item => item.dev_id == id);
         return messages;
      },
   },
   mutations: {
      SET_MESSAGES(state, data){
         state.messages = data;
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
            console.log(response.data);
            response.data.forEach(function(item){
               item.DateTime = new Date(item.DateTime).toLocaleString().replace(/,+/g, "");
               return item;
            });
            commit('SET_MESSAGES', response.data);
         });
      }
   },
}