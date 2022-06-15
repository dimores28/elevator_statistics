import axios from 'axios'
const API_URL = 'http://localhost:3000/';

export default {
   namespaced: true,
   state: {
       cards: [], 
   },
   getters: {
       CARDS: state=> state.cards,
       HAS: state => id => state.cards.some(card => card.id === id),
       CARDS_BY_TYPE: (state) => (type) => {
           let cardsFilteres = state.cards.filter(item => item.UAType == type);
        return cardsFilteres;
      }
   },
   mutations: {
    SET_CARDS(state, data){
        state.cards = data;
    }
   },
   actions: {
       async CARD_LOAD({commit}){
        
        await axios.get(API_URL + 'settings')
        .then(response=>{
            let arr = []
            for(let i = 0; i < response.data.length; i++){
                arr.push(response.data[i]);
            }
            commit('SET_CARDS', arr);
        });
       }
   },
}