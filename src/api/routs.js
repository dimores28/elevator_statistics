import http from '@/api/http';

export async function all() {
	let { data } = await http.get('Route', {
		errorAlert: 'при отриманні маршрутів'
	});

	return data;
}


export async function routsByTimeRange(timerange) {
	let { data } = await http.get('Route/Range', { 
		params: { 
            startTime: timerange.startTime, 
			endTime: timerange.endTime
		},
		errorAlert: { 
			text: 'при завантаженні списку маршрутів',
			critical: false
		}
	}); 
	
	return data;
}

export async function mechanisms(id) {
	let { data } = await http.get('api/Alg/RoutID', { 
		params: {
			routID: id
		},
		errorAlert: { 
			text: 'при завантаженні списку механізмів в маршруті',
			critical: false
		}
	}); 
	
	return data;
}

export async function routLogs(routeID) {
	let { data } = await http.get('Route/Log', { 
		params: {
			MesIDRout: routeID
		},
		errorAlert: { 
			text: 'при завантаженні логів маршруту',
			critical: false
		}
	}); 
	
	return data;
}

export async function routAlarm(routeID) {
	let { data } = await http.get('api/Alg/RouteAlarms', { 
		params: {
			routID: routeID
		},
		errorAlert: { 
			text: 'при завантаженні Alarms маршруту',
			critical: false
		}
	}); 
	
	return data;
}

export async function routStops(id) {
	let { data } = await http.get(`Statistics/SimpleRoute/${id}`, { 
		errorAlert: { 
			text: 'при завантаженні Stops маршруту',
			critical: false
		}
	}); 
	
	return data;
}