import Twit, {
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

	public static getCurrentUser() {
		return new Promise((resolve, reject) => {
			this.twit.get('account/verify_credentials', (err, res) => {
				if(err) {
					reject(err);
				}
				resolve(res);
			});
		});
	}

	public static getWebhookList() {
		return new Promise((resolve, reject) => {
			this.twit.get('account_activity/all/webhooks', (err, res) => {
				if(err) {
					reject(err);
				}
				resolve(res);
			});
		});
	}

	public static setWebhook() {
		return new Promise((resolve, reject) => {
			this.twit.post('account_activity/all/dev/webhooks', {
				'url': 'https://archive.sapphire.sh/webhook',
			}, (err, res) => {
				if(err) {
					reject(err);
				}
				resolve(res);
			});
		});
	}

	public static subscribe() {
		return new Promise((resolve, reject) => {
			this.twit.post('account_activity/all/dev/subscriptions', (err, res) => {
				if(err) {
					reject(err);
				}
				resolve(res);
			});
		});
	}

	public static getRateLimitStatus() {
		return new Promise((resolve, reject) => {
			this.twit.get('application/rate_limit_status', (err, res) => {
				if(err) {
					reject(err);
				}
				resolve(res);
			});
		});
	}
}
