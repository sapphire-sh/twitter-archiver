import path from 'path';

import Express from 'express';

import HTML from './utils/HTML';

import oauth from './modules/oauth';

import webpack from 'webpack';

import WebpackDevMiddleware from 'webpack-dev-middleware';
import WebpackHotMiddleware from 'webpack-hot-middleware';

import config from '../build/webpack.config.client.dev';

const app = new Express();

if(process.env.NODE_ENV === 'dev') {
	const compiler = webpack(config);
	app.use(WebpackDevMiddleware(compiler, {
		'noInfo': true,
		'quiet': true,
		'publicPath': config.output.publicPath,
	}));
	app.use(WebpackHotMiddleware(compiler));
}

app.use('/', Express.static(path.resolve(__dirname, '../dist')));

app.use('/oauth', oauth);

app.get('/api/tweets/:date/:hour', (req, res) => {
	let date = new Date(`${req.params.date} ${req.params.hour}:00:00`);

	database.fetchTweets(date.getTime())
	.then((tweets) => {
		res.json(tweets.map((tweet) => {
			return JSON.parse(tweet.data);
		}));
	})
	.catch((err) => {
		return res.status(500).json(err);
	});
});

app.get('*', (req, res) => {
	res.send(HTML());
});

const port = process.env.PORT || 8015;

app.listen(port, (err) => {
	if(err) {
		return console.error(err);
	}
	console.info(`http://localhost:${port}`);
});
