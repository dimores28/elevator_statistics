import { createStore } from 'vuex';

import navigationData from './navigationData';
import routList from './routsList';
import card from './card';
import device from './device';
import sensors from './sensors';
import workingTime from './workingTime';
import alerts from './alerts';

import { addResponseHandler } from '@/api/http';

const store = createStore({
  modules: {
    navigationData,
    routList,
    card,
    device,
    sensors,
    workingTime,
    alerts
  },
  strict: process.env.NODE_ENV !== 'production',
})

addResponseHandler(
  function(response){
		if('errorAlert' in response.config){
			response.data = { res: true, data: response.data };
		}

		return response;
	},
	function(error){
		let config = error.config;

		if('errorAlert' in config){
			let { errorAlert } = config;

			if(typeof errorAlert === 'string'){
				errorAlert = { text: errorAlert };
			}

			store.dispatch('alerts/add', { 
				text: 'Помилка відповіді сервера ' + errorAlert.text,
				timeout: errorAlert.timeout ?? 5000,
				critical: errorAlert.critical ?? false
			});

			return { data: { res: false, data: null }};
		}
		
		return Promise.reject(error);
	}
);

export default store;
