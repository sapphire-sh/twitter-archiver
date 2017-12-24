import Express from 'express';

import Database from '../libs/database';

import session from 'express-session';
import connectRedis from 'connect-redis';

const RedisStore = connectRedis(session);

const client = Database.client();

const router = Express.Router();

router.use(session({
	'store': new RedisStore({
		'client': client,
		'ttl': 7 * 24 * 3600,
		'prefix': 'ta:sess:',
	}),
	'cookie': {
		'path': '/',
		'httpOnly': true,
		'secure': true,
		'maxAge': 7 * 24 * 3600,
	},
	'secret': process.env.consumer_key,
	'saveUninitialized': true,
	'resave': false,
}));

export default router;
