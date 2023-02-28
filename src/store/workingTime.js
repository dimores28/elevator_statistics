import axios from 'axios'
import {API_URL} from '@/core/host'

import * as workingTime from '@/api/workingTime';

export default {
    namespaced: true,
    state: {
        hoursWorked: []
    },
    getters: {
        HOURS_WORKED: state => state.hoursWorked,
        HOURS_WORKED_BY_EID: state => (id) => {
            let wt = state.hoursWorked.find(item => item.UA_EIndex == id);
            
            if(wt === undefined){
                return 0
            }

            return parseInt(wt.UA_WorkingTime); 
        } 
    },
    mutations: {
        SET_HOURS_WORKED(state, hoursWorked) {
            state.hoursWorked = hoursWorked;
        }
    },
    actions: {
        async LOAD_HOURS_WORKED({commit}) {

            let { res, data } = await workingTime.load(); 

            if(res) {
                commit("SET_HOURS_WORKED", data);
            }
        }
    }
}
