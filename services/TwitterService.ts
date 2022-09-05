import Twit from 'twit';
import { Tweet, User } from '../models';
import { DatabaseService } from './DatabaseService';

export class TwitterService {
	private static twit: Twit;

	public static async initialize(token: Twit.ConfigKeys) {
		this.twit = new Twit(token);
	}

	public static async start() {
		while (true) {
			try {
				const tweets = await this.fetchTimeline();

				console.log(`tweets ${tweets.length}`);

				tweets.forEach((tweet) => {
					DatabaseService.addQueue(tweet);
					// Downloader.addQueue(tweet);
				});

				// {
				// 	const users = await this.getMutedUsersList();
				// 	Database.setMutedUsersList(users);
				// }

				// {
				// 	const users = await this.getBlockedUsersList();
				// 	Database.setBlockedUsersList(users);
				// }
			} catch (error) {
				console.log(error);
			}

			await new Promise((resolve) => {
				setTimeout(resolve, 1.1 * 60 * 1000);
			});
		}
	}

	public static fetchTimeline() {
		return new Promise<Tweet[]>((resolve, reject) => {
			this.twit.get(
				'statuses/home_timeline',
				{
					count: 200,
					include_my_retweet: true,
					cards_platform: 'Web-13',
					include_entities: true,
					include_user_entities: true,
					include_cards: true,
					send_error_codes: true,
					tweet_mode: 'extended',
					include_ext_alt_text: true,
					include_reply_count: true,
				} as any,
				(error, res) => {
					if (error) {
						reject(error);
					}
					const tweets = res as Tweet[];
					if (tweets === null) {
						reject('invalid response');
					}
					resolve(tweets);
				}
			);
		});
	}

	public static getCurrentUser() {
		return new Promise((resolve, reject) => {
			this.twit.get('account/verify_credentials', (error, res) => {
				if (error) {
					reject(error);
				}
				resolve(res);
			});
		});
	}

	public static getRateLimitStatus() {
		return new Promise((resolve, reject) => {
			this.twit.get('application/rate_limit_status', (error, res) => {
				if (error) {
					reject(error);
				}
				resolve(res);
			});
		});
	}

	private static async getUsersList(endpoint: string) {
		try {
			let users: User[] = [];
			let cursor = '0';

			do {
				const { data } = (await this.twit.get(endpoint, {
					count: 200,
					cursor: cursor,
				})) as {
					data: {
						users: User[];
						next_cursor_str: string;
					};
				};

				users = users.concat(data.users);
				cursor = data.next_cursor_str;

				await new Promise((resolve) => {
					setTimeout(resolve, 1000);
				});
			} while (cursor !== '0');

			return Promise.resolve(users);
		} catch (error) {
			return Promise.reject(error);
		}
	}

	public static async getFollowingUsersList() {
		return this.getUsersList('friends/list');
	}

	public static async getFollowerUsersList() {
		return this.getUsersList('followers/list');
	}

	public static async getMutedUsersList() {
		return this.getUsersList('mutes/users/list');
	}

	public static async getBlockedUsersList() {
		return this.getUsersList('blocks/list');
	}
}
