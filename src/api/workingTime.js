import http from '@/api/http';

export async function load() {
    let { data } = await http.get('ElementsWorkingTime', { 
		errorAlert: { 
			text: 'при отриманні завантаженні часу роботи',
			critical: false
		}
	});
	
	return data;
}