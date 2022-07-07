import axios from 'axios'
import {API_URL} from '@/core/host'

export default {
    namespaced: true,
    state: {
        messages: [],
    },
    getters: {
        MESSAGES: state => state.messages,
    },
    mutations: {
        SET_MESSAGES(state, mess){
            state.messages = mess;
        }
    },
    actions: {
        async LOAD_ALL({commit}){
            await axios.get(API_URL + `Sensors`)
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

                console.log(error.toJSON());
            });
        },
    }
}