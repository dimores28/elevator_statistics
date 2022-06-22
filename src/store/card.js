import axios from 'axios'
// const API_URL = 'http://localhost:3000/';
const API_URL = 'http://localhost:30094/';

export default {
   namespaced: true,
   state: {
       cards: [], 
   },
   getters: {
       CARDS: state=> state.cards,
       HAS: state => id => state.cards.some(card => card.ID === id),
       CARDS_BY_TYPE: (state) => (type) => {
           let cardsFilteres = state.cards.filter(item => item.UAType == type);
        return cardsFilteres;
      },
      CARD_BY_ID: (state) => (id) =>{
        let card = state.cards.find(card => card.ID === id);
        return card;
      }
   },
   mutations: {
    SET_CARDS(state, data){
        state.cards = data;
    }
   },
   actions: {
       async CARD_LOAD({commit}){
        
        await axios.get(API_URL + 'api/SettingsTable')
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