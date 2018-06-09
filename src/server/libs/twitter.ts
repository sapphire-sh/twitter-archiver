/* istanbul ignore file */
import Promise from 'bluebird';

import Twit, {
	Callback,
	Params,
	Stream,
} from 'twit';

import {
	Database,
} from './database';

import {
	Tweet,
} from '../../shared/models';

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

export class Twitter {
	private static twit: Twit;
	private static stream: Stream;

	static initialize(token: OAuthToken) {
		this.twit = new Twit(token);

		this.stream = this.twit.stream('user', {
			// 'tweet_mode': 'extended',
		});

		this.stream.on('tweet', (tweet) => {
			Database.addQueue(tweet);
		});

		Promise.resolve().then(function loop() {
			Twitter.fetchTimeline().then((tweets) => {
				tweets.forEach((tweet) => {
					Database.addQueue(tweet);
				});
			}).catch((err) => {
				console.log(err);
			}).then(() => {
				setTimeout(loop, 2 * 60 * 1000);
			});
		});
	}

	static fetchTimeline() {
		return new Promise<Tweet[]>((resolve, reject) => {
			this.twit.get('statuses/home_timeline', {
				'count': 200,
			}, (err, res) => {
				if(err) {
					reject(err);
				}
				const tweets = res as Tweet[];
				if(tweets === null) {
					reject('invalid response');
				}
				resolve(tweets);
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
