import Express from 'express';

import {
	Database,
	Twitter,
} from '../libs';

const router = Express.Router();

router.get('/tweets', async (_, res) => {
	try {
		const id = await Database.getHistory();
		const tweets = await Database.getTweets(id);
		res.json(tweets);
	}
	catch(err) {
		res.status(500).json(err);
	}
});

router.post('/history', async (req, res) => {
	try {
		await Database.setHistory(req.body.id);
		res.json(true);
	}
	catch(err) {
		res.status(500).json(err);
	}
});

router.get('/limit', async (_, res) => {
	try {
		const status = await Twitter.getRateLimitStatus();
		res.json(status);
	}
	catch(err) {
		res.status(500).json(err);
	}
});

router.get('/users/follower', async (_, res) => {
	try {
		const users = await Twitter.getFollowerUsersList();
		res.json(users);
	}
	catch(err) {
		res.status(500).json(err);
	}
});

router.get('/users/following', async (_, res) => {
	try {
		const users = await Twitter.getFollowingUsersList();
		res.json(users);
	}
	catch(err) {
		res.status(500).json(err);
	}
});

router.get('/users/blocked', async (_, res) => {
	try {
		const users = await Twitter.getBlockedUsersList();
		res.json(users);
	}
	catch(err) {
		res.status(500).json(err);
	}
});

router.get('/users/muted', async (_, res) => {
	try {
		const users = await Twitter.getMutedUsersList();
		res.json(users);
	}
	catch(err) {
		res.status(500).json(err);
	}
});

export default router;
