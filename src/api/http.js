import axios from 'axios';

const instance = axios.create({
	baseURL: 'http://192.168.0.120:3000/',
	timeout: 10000
});

export function addResponseHandler(success, error){
	instance.interceptors.response.use(success, error);
}

export default instance;