import * as cartApi from '@/api/card.js';


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

            let { res, data } = await cartApi.load();

            if(res) {
                let arr = []

                for(let i = 0; i < data.length; i++){
                    arr.push(data[i]);
                }
                commit('SET_CARDS', arr);
            }
       },
       async LOAD_NUMBER_WARNINGS({commit}, timerange){
            let start = timerange.StartDate.toISOString().slice(0, 10);
            let end = timerange.EndDate.toISOString().slice(0, 10);

            let { res, data } = await cartApi.loadNumWarn(start, end);

            if(res) {
                commit('SET_WARNINGS', data);
            }
       }
   },
}