import axios from 'axios'
import {API_URL} from '@/core/host'


export default {
   namespaced: true,
   state: {
       cards: [], 
       warnings: [], 
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
      },
      NUMBER_WARNINGS_BY_ID: state => id => {
        let dev = state.warnings.find(w => w.Id == id);

        if(dev === undefined){
            return 0
        }

        return dev.Quantity;
      }
   },
   mutations: {
    SET_CARDS(state, data){
        state.cards = data;
    },
    SET_WARNINGS(state, data) {
        state.warnings = data;
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
       },
       async LOAD_NUMBER_WARNINGS({commit}, timerange){
        let start = timerange.StartDate.toISOString().slice(0, 10);
        let end = timerange.EndDate.toISOString().slice(0, 10);
        await axios.get(API_URL + `api/Alg/NumberWarnings?startTime=${start}&endTime=${end}`)
        .then(resp => {
            commit('SET_WARNINGS', resp.data);
        });
       }
   },
}