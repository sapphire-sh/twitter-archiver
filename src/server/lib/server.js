'use strict';

import path from 'path';

import Database from './database';

import express from 'express';
import auth from 'basic-auth';

let isInitialized = false;

class Server {
	static initialize() {
		let self = this;

		self.app = express();

		self.app.use(express.static(path.resolve(__dirname, '../../dist')));

		// self.app.use((req, res, next) => {
		// 	let credentials = auth(req);
		//
		// 	if(credentials === undefined || credentials.name !== 'sapphire' || credentials.pass !== 'sapphire') {
		// 		res.setHeader('WWW-Authenticate', 'Basic realm=Authorization Required');
		// 		res.sendStatus(401);
		// 	}
		// 	else {
		// 		next();
		// 	}
		// });

		return new Promise((resolve, reject) => {
			isInitialized = true;
			resolve();
		});
	}

	static start() {
		let self = this;

		self.database = Database.instance().database;

		self.app.get('/api/tweets/:date/:hour', (req, res) => {
			let date = new Date(`${req.params.date} ${req.params.hour}:00:00`);
			console.log(date.getTime());

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
