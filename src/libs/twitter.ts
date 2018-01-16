/* istanbul ignore file */
import Promise from 'bluebird';

import Twit, {
	Callback,
	Params,
	Stream,
} from 'twit';

import Database from './database';

import {
	Tweet,
} from '../models';

import {
	AccessToken,
} from './oauth';

export interface OAuthToken extends AccessToken {
	consumer_key: string;
	consumer_secret: string;
};

enum RequestType {
	GET = 'GET',
	POST = 'POST',
};

class Twitter {
	private static twit: Twit;
	private static stream: Stream;

	static initialize(token: OAuthToken) {
		let self = this;

		self.twit = new Twit(token);

		self.stream = self.twit.stream('user', {
			'tweet_mode': 'extended',
		});

		self.stream.on('tweet', (tweet) => {
			Database.insertTweet(tweet)
			.catch((err) => {
				console.error(err);
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
				return;
			}
			const tweets = res as Tweet[];
			if(tweets === null) {
				console.error(err);
				return;
			}
			tweets.forEach((tweet) => {
				return Database.insertTweet(tweet).catch((err) => {
					console.error(err);
				});
			});
		});
	}

	static _request(type: RequestType, url: string, params: Params) {
		let self = this;

		if(params === undefined) {
			params = {};
		}

		let fn: (url: string, params: object, callback: Callback) => void;
		switch(type) {
		case RequestType.GET:
			fn = self.twit.get;
			break;
		case RequestType.POST:
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

	static get(url: string, params?: Params) {
		let self = this;

		if(params === undefined) {
			params = {};
		}

		return self._request(RequestType.GET, url, params);
	}

	static post(url: string, params: Params) {
		let self = this;

		return self._request(RequestType.POST, url, params);
	}

	static getCurrentUser() {
		let self = this;

		return self.get('account/verify_credentials', {});
	}
}

export default Twitter;
