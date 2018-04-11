import * as Express from 'express';

import {
	Database,
} from '../libs';

const router = Express.Router();

router.get('/tweets/:date/:hour', (_, res) => {
	const min = '0';
	const max = '994086115152900096';

	Database.getTweets(min, max)
	.then((tweets) => {
		res.json(tweets);
	})
	.catch((err) => {
		res.status(500).json(err);
	});
});

export default router;
