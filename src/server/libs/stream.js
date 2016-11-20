'use strict';

import Twit from 'twit';

import Database from './database';

class Stream {
	static initialize(config) {
		let self = this;

		self.twit = new Twit(config);
	}

	static start() {
		let self = this;

		self.stream = self.twit.stream('user');

		self.stream.on('tweet', (tweet) => {
			Database.insertTweet(tweet);
		});

		setInterval(self.fetchTimeline.bind(this), 10 * 60 * 1000);
	}

	static fetchTimeline() {
		let self = this;

		self.twit.get('statuses/home_timeline', {
			count: 200
		}, (err, res) => {
			if(err) {
				console.error(err);
			}
			res.map(tweet => Database.insertTweet(tweet));
		});
	}
}

export default Stream;
