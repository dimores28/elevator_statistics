import http from '@/api/http';

export async function load(device){
	let { data } = await http.get('api/Alg/DeviceRenge', { 
		params: { 
            byID: device.id,
            startTime: device.start,
            endTime: device.end
         },
		errorAlert: { 
			text: 'при завантажені механізму',
			critical: false
		}
	});
	
	return data;
}

export async function listOfRoutes(device) {
    let { data } = await http.get('api/Alg/PresenceRoute', { 
		params: { 
            byID: device.id,
            startTime: device.start,
            endTime: device.end
         },
		errorAlert: { 
			text: 'при завантажені списку маршрутів',
			critical: false
		}
	});
	
	return data;
}

export async function launches(device) {
    let { data } = await http.get(`Statistics/Launches/${device.id}/${device.start}/${device.end}`, { 
		errorAlert: { 
			text: 'при завантажені списку запусків механізму',
			critical: false
		}
	});
	
	return data;
}

export async function repairs(device) {
    let { data } = await http.get(`Statistics/Repairs/${device.id}/${device.start}/${device.end}`, { 
		errorAlert: { 
			text: 'при завантажені списку ремонту механізму',
			critical: false
		}
	});
	
	return data;
}