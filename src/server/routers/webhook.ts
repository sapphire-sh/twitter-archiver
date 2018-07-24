import * as Express from 'express';

import {
	Twitter,
} from '../libs';

const router = Express.Router();

router.get('/', (req, res) => {
	console.log('get');
	console.log(req);
	console.log(res);
	res.sendStatus(200).json(true);
});

router.get('/', (req, res) => {
	console.log('post');
	console.log(req);
	console.log(res);
	res.sendStatus(200).json(true);
});

router.get('/set', (req, res) => {
	Twitter.setWebhook();
	res.json(true);
});

export default router;
