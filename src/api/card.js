import http from '@/api/http';

export async function load(){
	let { data } = await http.get('api/SettingsTable', { 
		errorAlert: { 
			text: 'при отриманні списку механізмів',
			critical: false
		}
	});
	
	return data;
}

export async function loadNumWarn(start, end) {
	let { data } = await http.get('api/Alg/NumberWarnings', { 
		params: { startTime: start, endTime: end },
		errorAlert: { 
			text: 'при завантаженні кількості аварій',
			critical: false
		}
	});

	return data;
}



