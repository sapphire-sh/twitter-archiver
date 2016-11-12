'use strict';

import Sequelize from 'sequelize';

import Tweet from '../models/tweet';

let isInitialized = false;

class Database {
	static initialize(config) {
		let self = this;

		let sequelize = new Sequelize(config);

		self.database = {};
		self.database.tweet = sequelize.import('tweet', Tweet);

		return new Promise((resolve, reject) => {
			Promise.all(Object.keys(self.database).map((k) => {
				return self.database[k].sync();
			}))
			.then(() => {
				isInitialized = true;
				resolve();
			})
			.catch((err) => {
				reject(err);
			});
		});
	}

	static instance() {
		let self = this;

		if(isInitialized) {
			return self;
		}
	}
}

export default Database;
