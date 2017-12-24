/* istanbul ignore file */
import Promise from 'bluebird';

import Twit from 'twit';

import Database from './database';

class Twitter {
	static initialize(token) {
		let self = this;

		self.twit = new Twit(token);

		self.stream = self.twit.stream('user', {
			'tweet_mode': 'extended',
		});

		self.stream.on('tweet', (tweet) => {
			Database.insertTweet(tweet)
			.catch((err) => {
				console.log(err);
			});
		});

		setInterval(self.fetchTimeline.bind(this), 10 * 60 * 1000);
	}

	static fetchTimeline() {
		let self = this;

		self.twit.get('statuses/home_timeline', {
			'count': 200,
		}, (err, res) => {
			if(err) {
				console.error(err);
			}
			else {
				res.forEach((tweet) => {
					return Database.insertTweet(tweet)
					.catch((err) => {
						console.log(err);
					});
				});
			}
		});
	}

	static _request(type, url, params) {
		let self = this;

		if(params === undefined) {
			params = {};
		}

		let fn;
		switch(type) {
		case 'get':
			fn = self.twit.get;
			break;
		case 'post':
			fn = self.twit.post;
			break;
		default:
			return Promise.reject('invalid request type');
		}

		return new Promise((resolve, reject) => {
			fn(url, params, (err, res) => {
				if(err) {
					reject(err);
				}
				else {
					resolve(res);
				}
			});
		});
	}

	static get(url, params) {
		let self = this;

		return self._request('get', url, params);
	}

	static post(url, params) {
		let self = this;

		return self._request('post', url, params);
	}

	static getCurrentUser() {
		let self = this;

		return self.get('account/verify_credentials');
	}
}

export default Twitter;
