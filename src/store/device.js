import msToTimemsToTime from '@/api/convertMsToTime'
import * as cartApi from '@/api/device.js';

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

         let { res, data } = await cartApi.load({id: device.id, start: start, end: end});

         if(res) {
            data.forEach(function(item){
               item.DateTime = new Date(item.DateTime).toLocaleString().replace(/,+/g, "");
               return item;
            });

            commit('SET_MESSAGES', data);
         }
      },
      async GET_LIST_OF_ROUTES({commit}, device){
         let start = device.range.StartDate.toISOString().slice(0, 10);
         let end = device.range.EndDate.toISOString().slice(0, 10);

         let { res, data } = await cartApi.listOfRoutes({id: device.id, start: start, end: end});

         if(res) {

            commit('SET_ROUTE_LIST', data);
         }
      },
      async LOAD_LAUNCHES({commit}, device){
         if(device?.id === undefined) {
            return;
         }

         let { res, data } = await cartApi.launches(device);

         if(res) {
            commit('SET_LAUNCHES', data);
         }
      },
      async LOAD_REPAIRS({commit}, device){
         if(device?.id === undefined) {
            return;
         }
         let { res, data } = await cartApi.repairs(device);

         if(res) {
            commit('SET_REPAIRS', data);
         }
      },
      async LOAD_STATISTICAL_DATA(context, device){
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
