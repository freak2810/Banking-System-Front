import axios from 'axios';

export default axios.create({
	baseURL: 'https://banking-he.herokuapp.com/api/',
});
