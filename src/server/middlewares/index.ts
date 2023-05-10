import accountValidator from './accountValidator';
import bodyParser from './bodyParser';
import morgan from './morgan';
import session from './session';

export default [bodyParser, morgan, session, accountValidator];
