import crypto from 'crypto';
	
import * as Express from 'express';

import {
	Twitter,
} from '../libs';

const router = Express.Router();

console.log(__env.consumer_secret);

router.get('/', (req, res) => {
	console.log(req.protocol);
	const hmac = crypto.createHmac('sha256', __env.consumer_secret);
	console.log(req.query);
	console.log(req.query.crc_token);
	hmac.update(req.query.crc_token);

	res.status(200).json({
		'response_token': hmac.digest('hex'),
	});
});

router.get('/set', (req, res) => {
	Twitter.setWebhook();
	res.json(true);
});

export default router;
