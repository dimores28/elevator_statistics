import axios from 'axios'
import msToTimemsToTime from '@/api/convertMsToTime'
import {API_URL} from '@/core/host'

export default {
	namespaced: true,
   state: {
      messages: [],
      routeList: [],
      period: null,
      launches: [],
      repairs: [],
   },
   getters: {
      MESSAGES: state => state.messages,
      MESSAGES_BY_ID: (state) => (id) => {
         let messages = state.messages.filter(item => item.dev_id == id);
         return messages;
      },
      ROUTE_LIST : state => state.routeList,
      TIME_REPAIR(state){
         let repairTime = 0;
         let start = null;

         state.repairs.forEach(item =>{
            if(item.MsgNr === 6){
               start = item.DateTime 
            }else if(item.MsgNr === 7 && start){
               repairTime += (new Date(item.DateTime) - new Date(start));
               start = null;
            }
         })

         return repairTime;
      },
      TIME_WORK(state){
         let workTime = 0;
         let start = null;

         state.launches.forEach(item =>{
            if(item.MsgNr === 23 || item.MsgNr === 24){
               start = item.DateTime;
            }else if(item.MsgNr === 25 && start){
               workTime += (new Date(item.DateTime) - new Date(start));
               start = null;
            }
         });

         return workTime;
      },
      PERIOD: state => state.period,
      SIMPLE_TIME(state, getters){
         let time = state.period - getters.TIME_REPAIR - getters.TIME_WORK;
         return msToTimemsToTime(time);
      },
      WORK_TIME(state, getters){
         return msToTimemsToTime(getters.TIME_WORK);
      },
      REPAIR_TIME(state, getters){
         return msToTimemsToTime(getters.TIME_REPAIR);
      },
      LAUNCHES: state => state.launches,
      REPAIRS: state => state.repairs,
      ERRORS: state => state.messages.filter(e => e.ClassName === "NEW_ErrorsSens")

   },
   mutations: {
      SET_MESSAGES(state, data){
         state.messages = data;
      },
      SET_ROUTE_LIST(state, data){
         state.routeList = data;
      },
      SET_LAUNCHES(state, data){
         state.launches = data;
      },
      SET_REPAIRS(state, data){
         state.repairs = data;
      },
      SET_PERIOD(state, period){
         state.period = period.EndDate - period.StartDate;
      }
   },
   actions: {
      async LOAD({commit}, device){
         let start = device.range.StartDate.toISOString().slice(0, 10);
         let end = device.range.EndDate.toISOString().slice(0, 10);
         await axios.get(API_URL + 'api/Alg/DeviceRenge', 
         {
            params:{
               byID: device.id,
               startTime: start,
               endTime: end
         }})
         .then((response)=>{
            response.data.forEach(function(item){
               item.DateTime = new Date(item.DateTime).toLocaleString().replace(/,+/g, "");
               return item;
            });
            commit('SET_MESSAGES', response.data);
         });
      },
      async GET_LIST_OF_ROUTES({commit}, device){
         let start = device.range.StartDate.toISOString().slice(0, 10);
         let end = device.range.EndDate.toISOString().slice(0, 10);

         await axios.get(API_URL + 'api/Alg/PresenceRoute',{
            params:{
               deviceID: device.id,
               startTime: start,
               endTime: end,
            }
         })
         .then(response=>{
            commit('SET_ROUTE_LIST', response.data);
         });
      },
      async LOAD_LAUNCHES({commit}, device){
         if(device?.id === undefined) {
            return;
         }
         await axios.get(API_URL + `Statistics/Launches/${device?.id}/${device.start}/${device.end}`)
         .then(response =>{
            commit('SET_LAUNCHES', response.data)
         });

      },
      async LOAD_REPAIRS({commit}, device){
         if(device?.id === undefined) {
            return;
         }
         await axios.get(API_URL + `Statistics/Repairs/${device?.id}/${device.start}/${device.end}`)
         .then(response =>{
            commit('SET_REPAIRS', response.data)
         });
      },
      async LOAD_STATISTICALl_DATA(context, device){
         let dev = {};
         dev.id = device.id;
         dev.start = device.range.StartDate.toISOString().slice(0, 10);
         dev.end = device.range.EndDate.toISOString().slice(0, 10);

         context.commit('SET_PERIOD', device.range);

         await context.dispatch('LOAD_LAUNCHES', dev);
         await context.dispatch('LOAD_REPAIRS', dev);
      }, 

   },
}

function msToTime(duration) {
   let h,m,s;
   h = Math.floor(duration/1000/60/60);
   m = Math.floor((duration/1000/60/60 - h)*60);
   s = Math.floor(((duration/1000/60/60 - h)*60 - m)*60);

   s < 10 ? s = `0${s}`: s = `${s}`
   m < 10 ? m = `0${m}`: m = `${m}`
   h < 10 ? h = `0${h}`: h = `${h}`

   return `${h}:${m}:${s}`;
 }