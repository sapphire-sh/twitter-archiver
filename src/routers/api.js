import Express from 'express';

const router = Express.Router();

router.get('/tweets/:date/:hour', (req, res) => {
	let date = new Date(`${req.params.date} ${req.params.hour}:00:00`);

	// database.fetchTweets(date.getTime())
	// .then((tweets) => {
	// 	res.json(tweets.map((tweet) => {
	// 		return JSON.parse(tweet.data);
	// 	}));
	// })
	// .catch((err) => {
	// 	return res.status(500).json(err);
	// });
});

export default router;
