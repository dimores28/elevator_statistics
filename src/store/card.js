import axios from 'axios'
const API_URL = 'http://localhost:3000/';

export default {
   namespaced: true,
   state: {
       cards: [], 
   },
   getters: {
       CARDS: state=> state.cards,
       CARDS_BY_TYPE: state => type => state.products.some(pr => pr.type === type),
   },
   mutations: {
    SET_CARDS(state, data){
        state.cards = data;
    }
   },
   actions: {
       async CARD_LOAD({commit}){
        await axios.get(API_URL + 'states')
        .then(response=>{
            commit('SET_CARDS', response.data);
        });
       }
   },
}
//has: state => id => state.products.some(pr => pr.id === id)