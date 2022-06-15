import axios from 'axios'

export default {
	namespaced: true,
   state: {
      title: 'Маршруты',
      text: '',
   },
   getters: {
      TITLE: state => state.title,
      TEXT: state => state.text,
   },
   mutations: {
      WRITE_TITLE(state, title){
         state.title = title;
      },
      WRITE_TEXT(state, text){
         state.text = text;
      }
   },
   actions: {
      SET_TITLE({commit}, title){
         commit('WRITE_TITLE', title);
      },
      SET_TEXT({commit}, text){
         commit('WRITE_TEXT', text);
      }
   },
}