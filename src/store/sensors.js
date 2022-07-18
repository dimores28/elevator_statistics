import axios from 'axios'
import {API_URL} from '@/core/host'

export default {
    namespaced: true,
    state: {
        messages: [],
        quantity : 0,
        crashStatistics: []
    },
    getters: {
        MESSAGES: state => state.messages,
        QUANTITY: state => state.quantity,
        CRASH_STATISTICS: state => state.crashStatistics
    },
    mutations: {
        SET_MESSAGES(state, mess) {
            state.messages = mess;
        },
        WRITE_QUANTITY(state, num) {
            state.quantity = num;
        },
        SET_CRASH_STAT(state, data) {
            state.crashStatistics[0] = data[0] ? data[0].Quantity : 0
            state.crashStatistics[1] = data[1] ? data[1].Quantity : 0
        }
    },
    actions: {
        async LOAD_ALL({commit}, timerange){
            let start = timerange.StartDate.toISOString().slice(0, 10);
            let end = timerange.EndDate.toISOString().slice(0, 10);

            await axios.get(API_URL + `Sensors/Messages/${start}/${end}`)
            .then(response => {
                response.data.forEach(element => {
                    element.DateTime = new Date(element.DateTime).toLocaleString().replace(/,+/g, "");
                    element.Text1 = element.Text1.replace(`"${element.PText5}"`, "");
                    return element;
                });

                commit('SET_MESSAGES', response.data);
            })
            .catch(err => {

                if (err.response) { 
                // client received an error response (5xx, 4xx)
                } else if (err.request) { 
                // client never received a response, or request never left 
                } else { 
                // anything else 
                } 

                console.log(err.toJSON());
            });
        },
        async LOAD_STAT({commit}, Msg){
            await axios.get(API_URL + `Sensors/NumberAccidents/${Msg.MsgN}/${Msg.devID}`)
            .then( response => {
                commit('SET_CRASH_STAT', response.data);
            })
            .catch( err => {
                console.log(err.toJSON());
            });

        },
        SET_QUANTITY({commit}, num) {
            commit('WRITE_QUANTITY', num);
        }
    }
}
