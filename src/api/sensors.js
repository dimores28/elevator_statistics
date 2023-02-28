import http from '@/api/http';

export async function sensorsMessagesByTimeRange(start, end) {
	let { data } = await http.get(`Sensors/Messages/${start}/${end}`, { 
		errorAlert: { 
			text: 'при завантаженні списку аварійних повідомлень по датчикам',
			critical: false
		}
	}); 
	
	return data;
}