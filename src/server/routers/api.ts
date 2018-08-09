import Express from 'express';

import {
	Database,
	Twitter,
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

router.get('/limit', (_, res) => {
	Twitter.getRateLimitStatus().then((status) => {
		res.json(status);
	}).catch((err) => {
		res.json(err);
	});
});

router.get('/users/followers', (_, res) => {
	Twitter.getFollowersList().then((users) => {
		res.json(users);
	}).catch((err) => {
		res.json(err);
	});
});

router.get('/users/following', (_, res) => {
	Twitter.getFollowingUsersList().then((users) => {
		res.json(users);
	}).catch((err) => {
		res.json(err);
	});
});

router.get('/users/blocked', (_, res) => {
	Twitter.getBlockedUsersList().then((users) => {
		res.json(users);
	}).catch((err) => {
		res.json(err);
	});
});

router.get('/users/muted', (_, res) => {
	Twitter.getMutedUsersList().then((users) => {
		res.json(users);
	}).catch((err) => {
		res.json(err);
	});
});

export default router;
