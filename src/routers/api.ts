import * as Express from 'express';

import Database from '../libs/database';

const router = Express.Router();

router.get('/tweets/:date/:hour', (req, res) => {
	const date = new Date(`${req.params.date} ${req.params.hour}:00:00`);

	const min = date.getTime() / 1000;
	const max = min + 3600;

	Database.getTweets(min, max)
	.then((tweets) => {
		res.json(tweets);
	})
	.catch((err) => {
		res.status(500).json(err);
	});
});

export default router;
