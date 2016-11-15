'use strict';

import Twit from 'twit';
import CONFIG from '../../../config';

import Database from './database';

class Stream {
	static initialize() {
		let self = this;

		self.twit = new Twit(CONFIG);

		return Promise.resolve();
	}

	static start() {
		let self = this;

		self.stream = self.twit.stream('user');

		self.stream.on('tweet', (tweet) => {
			Database.insertTweet(tweet);
		});
	}
}

export default Stream;
