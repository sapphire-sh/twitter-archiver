import {
	Tweet,
} from '~/shared/models';

import {
	createDirectory,
	downloadMedia,
} from '~/server/helpers';

export class Downloader {
	private static queue: Tweet[];
	private static shouldProcess: boolean;

	public static async initialize() {
		await createDirectory('');

		this.queue = [];
		this.shouldProcess = true;
	}

	public static async start() {
		try {
			while(this.shouldProcess) {
				const tweet = Downloader.queue.shift();
				if(tweet !== undefined) {
					await Downloader.downloadTweet(tweet);
				}
				await new Promise((resolve) => {
					setTimeout(resolve, 100);
				});
			}
		}
		catch(err) {
			/* istanbul ignore next */
			console.log(err);
		}
	}

	public static stop() {
		this.shouldProcess = false;
	}

	public static addQueue(tweet: Tweet): void {
		this.queue.unshift(tweet);
	}

	private static async downloadTweet(tweet: Tweet) {
		if(tweet.retweeted_status === undefined) {
			await downloadMedia(tweet);
		}
		else {
			await downloadMedia(tweet.retweeted_status);
		}
	}
}
