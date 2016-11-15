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

	static insertTweet(tweet) {
		let self = this;

		self.database.tweet.create({
			id: tweet.id_str,
			timestamp: new Date(tweet.created_at).getTime() / 1000,
			data: JSON.stringify(tweet)
		});
	}

	static fetchTweets(dateTime) {
		let self = this;

		return self.database.tweet.findAll({
			where: {
				timestamp: {
					$and: {
						$gte: dateTime,
						$lt: dateTime + 3600
					}
				}
			},
			order: [
				['id', 'ASC']
			]
		});
	}
}

export default Database;
