//"http://localhost:30094/ElementsWorkingTime" 
import axios from 'axios'
import {API_URL} from '@/core/host'

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
            await axios.get(API_URL + "ElementsWorkingTime")
            .then(response => {
                commit("SET_HOURS_WORKED", response.data)
            })
            .catch( err => {
                console.log(err);

                if (err.response) { 
                    if(err.request.status === 404)
                    {
                        console.log('Error 404');
                    }
                }
                
                console.log(err.toJSON());
            });
        }
    }
}
