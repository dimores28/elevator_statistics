import axios from 'axios'
import {API_URL} from '@/core/host'

export default {
    namespaced: true,
    state: {
        messages: [],
        quantity : 0,
        crashStatistics: [],
        logs: [],
        charts: []
    },
    getters: {
        MESSAGES: state => state.messages,
        QUANTITY: state => state.quantity,
        CRASH_STATISTICS: state => state.crashStatistics,
        LOGS: state => state.logs,
        CHARTS: state => state.charts,
        TRENDS_DATA(state) {
            let currentDay = new Date();
            let series = [];
            let categories = [];

            for(let i = 0; i < 15; i++){
                categories.push(currentDay.setDate(currentDay.getDate() - i));
                currentDay = new Date();
            }

            let q = 0;
            categories.forEach(e => {
                let day = new Date(e).getDate();
                
                state.charts.forEach(item => {
                     if(day === new Date(item.DateTime).getDate()) {
                        q = item.Quantity;
                     }
                })

                series.push(q);
                q = 0;
            });

            return {series: series, categories: categories}
        }
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
        },
        SET_LOGS(state, logs) {
            state.logs = logs;
        },
        SET_CHARTS(state, charts) {

            if (!charts.length)
            {
                state.charts = [];
                return;
            }

            let curentDate = new Date(charts[0].DateTime);
            let normalizedCharts = [];
            let Quantity = 0;

            charts.forEach(el => {
                if (new Date(curentDate).getDate() === new Date(el.DateTime).getDate()) {
                    Quantity++;
                } else {
                    normalizedCharts.push({Quantity: Quantity, DateTime: new Date(curentDate)});
                    Quantity = 1;
                }
                
                curentDate = new Date(el.DateTime);
            });

            normalizedCharts.push({Quantity: Quantity, DateTime: new Date(curentDate)});

            state.charts = normalizedCharts;
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
        },
        async LOAD_LOGS({commit}, fields) {
            let start = fields.range.StartDate.toISOString().slice(0, 10);
            let stop = fields.range.EndDate.toISOString().slice(0, 10);
            await axios.get(API_URL + `Sensors/Logs/${fields.MsNr}/${fields.ID}/${fields.SensName}/${start}/${stop}`)
            .then( response => {
                let pattern = /"[^"\\]+(?:\\.[^"\\]*)*"/;

                response.data.forEach(el => {
                    el.DateTime = new Date(el.DateTime).toLocaleString().replace(/,+/g, "");
                    el.Text1 = el.Text1.replace(pattern, "");
                    el.Text1 = el.Text1.replace(pattern, "");
                    return el;
                });

                commit('SET_LOGS', response.data);
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
        },
        async LOAD_CHARTS_DATA({commit}, mess) {
            await axios.get(API_URL + `Sensors/Chart/${mess.MsgN}/${mess.devID}`)
            .then(response => {
                commit('SET_CHARTS', response.data);
            })
            .catch(err => {
                return Promise.reject(err);
            });
        }
    }
}
