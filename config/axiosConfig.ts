import axios from 'axios';

export default axios.create({
	baseURL: 'http://banking-he.herokuapp.com/api',
});
