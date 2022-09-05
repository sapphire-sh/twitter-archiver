import { Router } from 'express';
import { DatabaseService } from '../../services';

const router = Router();

router.get('/', async (req, res) => {
	res.send(JSON.stringify(process.env, null, 2));
});

router.get('/tweets', async (_, res) => {
	try {
		const id = await DatabaseService.getHistory();
		const tweets = await DatabaseService.getTweets(id);
		res.json(tweets);
	} catch (error) {
		res.status(500).json(error);
	}
});

router.post('/history', async (req, res) => {
	try {
		await DatabaseService.setHistory(req.body.id);
		res.json(true);
	} catch (error) {
		res.status(500).json(error);
	}
});

export const mainRouter = router;
