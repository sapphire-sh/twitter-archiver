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

		self.database = Database.instance().database;

		self.app.get('/api/tweets/:date/:hour', (req, res) => {
			let date = new Date(`${req.params.date} ${req.params.hour}:00:00`);

			self.database.tweet.findAll({
				where: {
					timestamp: {
						$and: {
							$gte: date.getTime() / 1000,
							$lt: (date.getTime() / 1000) + 3600
						}
					}
				},
				order: [
					['id', 'ASC']
				]
			})
			.then((tweets) => res.json(tweets));
		});

		self.app.listen(8015);
	}
}

export default Server;
