import accountValidator from './accountValidator';
import bodyParser from './bodyParser';
import morgan from './morgan';
import session from './session';
import webpack from './webpack';

export default [
	bodyParser,
	morgan,
	session,
	webpack,
	accountValidator,
];
