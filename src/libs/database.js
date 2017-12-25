import Promise from 'bluebird';

import redis from 'redis';

import zlib from '../utils/zlib';

const client = redis.createClient();

/* istanbul ignore next */
client.on('error', (err) => {
	console.log(`redis-error: ${err}`);
});

class Database {
	static client() {
		return client;
	}

	static zadd(args) {
		return new Promise((resolve, reject) => {
			client.zadd(args, (err, reply) => {
				if(err) {
					reject(err);
				}
				else {
					resolve(reply);
				}
			});
		});
	}

	static checkUnique(tweet) {
		let self = this;

		const date = new Date(tweet.created_at);
		const timestamp = date.getTime() / 1000;

		return self.getTweets(timestamp)
		.then((tweets) => {
			let isUnique = true;
			if(tweets.length > 0) {
				isUnique = tweets.filter((e) => {
					console.log(e.id_str);
					return e.id_str === tweet.id_str;
				}).length === 0;
			}
			return Promise.resolve(isUnique);
		});
	}

	static insertTweet(tweet) {
		let self = this;

		const date = new Date(tweet.created_at);
		const timestamp = date.getTime() / 1000;

		return self.checkUnique(tweet)
		.then((isUnique) => {
			if(isUnique === false) {
				return Promise.resolve();
			}

			return zlib.deflate(tweet).then((data) => {
				const args = [
					process.env.key,
					timestamp,
					data,
				];

				return self.zadd(args);
			});
		});
	}

	static getTweets(min, max) {
		let self = this;

		const args = [
			process.env.key,
			min,
			max === undefined ? min : `(${max}`,
		];

		return new Promise((resolve, reject) => {
			client.zrangebyscore(args, (err, reply) => {
				if(err) {
					reject(err);
				}
				else {
					Promise.all(reply.map((e) => {
						return zlib.inflate(e);
					}))
					.then((data) => {
						resolve(data);
					});
				}
			});
		});
	}
}

export default Database;
