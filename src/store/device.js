import axios from 'axios'
const API_URL = 'http://localhost:3000/';

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
      async LOAD({commit}){
         await axios.get(API_URL + 'messages')
         .then((response)=>{
            commit('SET_MESSAGES', response.data);
         });
      }
   },
}