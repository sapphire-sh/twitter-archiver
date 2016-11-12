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

		self.database = Database.instance().database;

		self.stream = self.twit.stream('user');

		self.stream.on('tweet', (tweet) => {
			self.database.tweet.create({
				id: tweet.id_str,
				timestamp: new Date(tweet.created_at).getTime() / 1000,
				data: JSON.stringify(tweet)
			});
		});
	}
}

export default Stream;
