import axios from 'axios'
import toISODate from '@/api/workWithDate'
import msToTimemsToTime from '@/api/convertMsToTime'
import {API_URL} from '@/core/host'


export default {
	namespaced: true,
   state: {
      routLogs: [],
      routeList: [],
      mechanisms: [],
      period: null,
      routeStops: [],
   },
   getters: {
      LOGS : state => state.routLogs,
      ROUTS : state => state.routeList,
      LOGS_BY_ROUTID : state => id =>{
         let rez = state.routLogs.filter(item => item.MesIDRout == id);
         return rez;
      }, 
      MECHANISMS: state => state.mechanisms,
      SORTED_LOGS: state =>{
         let sorted = state.routLogs.sort(function(a, b) {
               if(new Date(a.LastAccess) > new Date(b.LastAccess))
                  return 1;
               if(new Date(a.LastAccess) == new Date(b.LastAccess))
                  return 0;
               if(new Date(a.LastAccess) < new Date(b.LastAccess))
                  return -1;
         });
         return sorted;
 
      },
      SIMPLE_ROUTE(state){
         let stopTime = 0;
         let simple = null;

         state.routeStops.forEach(item =>{
            if(item.MesIDMes === 5){
               simple = item.LastAccess;
            }else if(item.MesIDMes === 2 && simple){
               stopTime += (new Date(item.LastAccess) - new Date(simple));
               simple = null;
            }
         });

         return stopTime;
      },
      PERIOD: state => state.period,
      SIMPLE_ROUTE_TIME(state, getters){
         return msToTimemsToTime(getters.SIMPLE_ROUTE);
      },
      PERIOD_TIME(state, getters){
         let work = state.period - getters.SIMPLE_ROUTE;
         return msToTimemsToTime(work);
      },
   },
   mutations: {
      SET_ROUT_LOGS(state, data){
         state.routLogs = data;
      },
      SET_ROUTE_LIST(state, data){
         state.routeList = data;
      },
      WRITE_MECHANISMS(state, data){
         state.mechanisms = data;
      },
      COMPLETE_LOGS(state, data){
         let log = {};

         data.forEach(function(mess){
            
            log.LastAccess = mess.DateTime;
            log.MesIDRout = mess.PValue4
            log.RouteMessage = mess.Text1;
            log.error = true;

            state.routLogs.push(log);
         });

         state.routLogs = state.routLogs.sort(function(a, b) {
            let time1 = a.LastAccess;
            let time2 = b.LastAccess;

            time1 = new Date(toISODate(time1));
            time2 = new Date(toISODate(time2));

            if(time1 > time2)
               return 1;
         
            if(time1 == time2)
               return 0;
            
            if(time1 < time2)
               return -1;
         });
      },
      ROUTE_STOPS(state, data){
         state.routeStops = data;
      },
      SET_PERIOD(state, period){
         state.period = period;
      }
   },
   actions: {
      async LOAD_ROUTE_LIST({commit}){
         await axios.get(API_URL + "Route")
         .then(response =>{
               response.data.forEach(function(item){
               item.StartTime = new Date(item.StartTime).toLocaleString().replace(/,+/g, "")
               item.StopTime = new Date(item.StopTime).toLocaleString().replace(/,+/g, "")

               return item;
            });

            commit('SET_ROUTE_LIST', response.data)
         });
      },
      async LOAD_ROUTE_LIST_BY_TIMERANGE({commit}, timerange){
          let start = timerange.StartDate.toISOString().slice(0, 10);
          let end = timerange.EndDate.toISOString().slice(0, 10);

         await axios.get(API_URL + "Route/Range", {params:{startTime: start, endTime: end}})
         .then(response =>{
               response.data.forEach(function(item){
               item.StartTime = new Date(item.StartTime).toLocaleString().replace(/,+/g, "")
               item.StopTime = new Date(item.StopTime).toLocaleString().replace(/,+/g, "")

               return item;
            });

            commit('SET_ROUTE_LIST', response.data)
         })
         .catch(err => {
            console.log(err.toJSON());
        });
      },
      async LOAD_MECHANISMS({commit}, routeID){
         await axios.get(API_URL + 'api/Alg/RoutID', {params:{routID: routeID}})
         .then(response =>{
            commit('WRITE_MECHANISMS', response.data);
         });
      },
      async LOAD_ROUT_LOGS({commit}, routeID){
         console.log(routeID);
         await axios.get(API_URL + 'Route/Log',  {params:{MesIDRout: routeID}})
         .then(response=>{
            response.data.forEach(function(item){
               item.LastAccess = new Date(item.LastAccess).toLocaleString().replace(/,+/g, "");
               return item;
            });

            commit('SET_ROUT_LOGS', response.data);
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
      async LOAD_ROUTE_ALARM({commit}, routeID){
         await axios.get(API_URL + 'api/Alg/RouteAlarms',  {params:{routID: routeID}})
         .then(response =>{
            response.data.forEach(function(item){
               item.DateTime = new Date(item.DateTime).toLocaleString().replace(/,+/g, "");
               return item;
            });
            
            commit('COMPLETE_LOGS', response.data);
         });
      },
      async LOG_ROUTE_STOPS({commit}, routeID){
         await axios.get(API_URL + `Statistics/SimpleRoute/${routeID}`)
         .then(response =>{
            commit('ROUTE_STOPS', response.data)
         });
      },
      SET_TIMERANGE({commit}, timerange){
          let renge = new Date(toISODate(timerange.StopTime)) - new Date(toISODate(timerange.StartTime));
         commit('SET_PERIOD', renge);
      }
   },
}
