import Database from './database';

class Stream {
	constructor(modules) {
		let self = this;

		self.twit = modules.twit;
		self.database = modules.database;
	}

	start() {
		let self = this;

		self.stream = self.twit.stream('user', {
			'tweet_mode': 'extended',
		});

		self.stream.on('tweet', (tweet) => {
			self.database.insertTweet(tweet);
		});

		setInterval(self.fetchTimeline.bind(this), 10 * 60 * 1000);
	}

	fetchTimeline() {
		let self = this;

		self.twit.get('statuses/home_timeline', {
			'count': 200,
		}, (err, res) => {
			if(err) {
				console.error(err);
			}
			else {
				res.map((tweet) => {
					return self.database.insertTweet(tweet);
				});
			}
		});
	}
}

export default Stream;
