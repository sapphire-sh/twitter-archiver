'use strict';

import mongoose from 'mongoose';

import Tweet from '../models/tweet';

class Database {
	static initialize(config) {
		let self = this;

		mongoose.connect('mongodb://localhost/twitter-archiver');
	}

	static insertTweet(tweet) {
		let self = this;

		let newTweet = Tweet({
			id: tweet.id_str,
			data: JSON.stringify(tweet),
			created_at: new Date(tweet.created_at)
		});

		newTweet.save();
	}

	static fetchTweets(dateTime) {
		let self = this;

		return new Promise((resolve, reject) => {
			Tweet.find({
				'created_at': {
					$gte: dateTime,
					$lt: dateTime + 3600 * 1000
				}
			}).sort({
				'id': 'asc'
			}).exec((err, tweets) => {
				if(err) {
					reject(err);
				}
				else {
					resolve(tweets);
				}
			});
		});
	}
}

export default Database;

