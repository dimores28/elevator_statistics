import axios from 'axios'

export default {
	namespaced: true,
   state: {
      title: 'Маршруты',
      text: '',
      StartDate : new Date(),
		EndDate : new Date(),
   },
   getters: {
      TITLE: state => state.title,
      TEXT: state => state.text,
      START_DATE: state => state.StartDate,
      END_DATE : state => state.EndDate,
   },
   mutations: {
      WRITE_TITLE(state, title){
         state.title = title;
      },
      WRITE_TEXT(state, text){
         state.text = text;
      },
      WRITE_START_DATE(state, date){
         state.StartDate = date;
      },
      WRITE_END_DATE(state, date){
         state.EndDate = date;
      }
   },
   actions: {
      SET_TITLE({commit}, title){
         commit('WRITE_TITLE', title);
      },
      SET_TEXT({commit}, text){
         commit('WRITE_TEXT', text);
      },
      SET_START_DATE({commit}, date){
         commit('WRITE_START_DATE', date);
      },
      SET_END_DATE({commit}, date){
         commit('WRITE_END_DATE', date);
      }
   },
}