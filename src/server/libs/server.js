'use strict';

import path from 'path';

import Database from './database';

import express from 'express';

class Server {
	static initialize(config) {
		let self = this;

		self.app = express();

		self.app.use(express.static(path.resolve(__dirname, '../../dist')));

		self.app.listen(config.port);
	}

	static start() {
		let self = this;

		self.app.get('/api/tweets/:date/:hour', (req, res) => {
			let date = new Date(`${req.params.date} ${req.params.hour}:00:00`);

			Database.fetchTweets(date.getTime())
			.then(tweets => res.json(tweets))
			.catch(err => res.json(err));
		});
	}
}

export default Server;
