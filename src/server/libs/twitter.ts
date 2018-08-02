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
}

enum RequestType {
	GET = 'GET',
	POST = 'POST',
}

export class Twitter {
	private static twit: Twit;
	private static stream: Stream;

	public static initialize(token: OAuthToken) {
		this.twit = new Twit(token);

		this.stream = this.twit.stream('user', {
			'tweet_mode': 'extended',
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

	public static fetchTimeline() {
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

	private static _request(type: RequestType, url: string, params: Params = {}) {
		let fn: (url: string, params: object, callback: Callback) => void;

		switch(type) {
		case RequestType.GET:
			fn = this.twit.get;
			break;
		case RequestType.POST:
			fn = this.twit.post;
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

	private static get(url: string, params: Params = {}) {
		if(params === undefined) {
			params = {};
		}

		return this._request(RequestType.GET, url, params);
	}

	private static post(url: string, params: Params = {}) {
		return this._request(RequestType.POST, url, params);
	}

	public static getCurrentUser() {
		return this.get('account/verify_credentials', {});
	}

	public static getWebhookList() {
		return new Promise((resolve, reject) => {
			this.twit.get('account_activity/all/webhooks', {}, (err, res) => {
				if(err) {
					console.log(err);
					reject(err);
				}
				resolve(res);
			});
		});
	}

	public static setWebhook() {
		this.post('account_activity/all/dev/webhooks', {
			'url': 'https://archive.sapphire.sh/webhook',
		}).then((res) => {
			console.log(res);
		}).catch((err) => {
			console.log(err);
		});
	}

	public static subscribe() {
		this.post('account_activity/all/dev/subscriptions').then((res) => {
			console.log(res);
		}).catch((err) => {
			console.log(err);
		});
	}
}
