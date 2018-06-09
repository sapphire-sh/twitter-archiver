import Express from 'express';

import cookieSession from 'cookie-session';

const router = Express.Router();

router.use(cookieSession({
	'name': 'session',
	'secret': (process.env.NODE_ENV === 'test' ? 'test' : __env.consumer_key),
	'maxAge': 7 * 24 * 3600 * 1000,
}));

export default router;
