import ENV from '../utils/config';
const BASE_URL = ENV.apiUrl;
export default class ApiEndpoint {
	getBasePath = () => {
		return `${BASE_URL}`;
	};
}