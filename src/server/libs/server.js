'use strict';

import path from 'path';

import Database from './database';

import express from 'express';

class Server {
	static initialize() {
		let self = this;

		self.app = express();

		self.app.use(express.static(path.resolve(__dirname, '../../dist')));

		return Promise.resolve();
	}

	static start() {
		let self = this;

		self.app.get('/api/tweets/:date/:hour', (req, res) => {
			let date = new Date(`${req.params.date} ${req.params.hour}:00:00`);

			Database.fetchTweets(date.getTime() / 1000)
			.then(tweets => res.json(tweets))
			.catch(err => res.json(err));
		});

		self.app.listen(8015);
	}
}

export default Server;
