import api from './api';
import auth from './auth';
import webhook from './webhook';

const routers = [
	{
		'path': '/api',
		'router': api,
	},
	{
		'path': '/webhook',
		'router': webhook,
	},
	{
		'path': '/auth',
		'router': auth,
	},
];

export default routers;
