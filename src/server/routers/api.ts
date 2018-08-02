import Express from 'express';

import {
	Database,
} from '../libs';

const router = Express.Router();

router.get('/tweets', (_, res) => {
	Database.getHistory().then((id) => {
		return Database.getTweets(id);
	}).then((tweets) => {
		res.json(tweets);
	}).catch((err) => {
		res.status(500).json(err);
	});
});

router.post('/history', (req, res) => {
	Database.setHistory(req.body.id).then(() => {
		res.json(true);
	}).catch((err) => {
		res.json(err);
	});
});

export default router;
