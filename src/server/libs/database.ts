import Knex from 'knex';

import {
	Socket,
} from '../libs';

import {
	Tweet,
	User,
	SocketEventType,
} from '../../shared/models';

import {
	deflate,
	inflate,
} from '../../shared/helpers';

interface DataRow {
	id: string;
	data: Buffer;
}

enum FilterType {
	BLOCK = 1,
	MUTE,
}

const knex = Knex({
	'client': 'mysql',
	'connection': {
		'host': 'localhost',
		'user': __env.database_user,
		'password': __env.database_password,
		'database': __env.database_name,
	},
	'useNullAsDefault': true,
});

knex.schema.hasTable('tweets').then((exists) => {
	if(exists) {
		return Promise.resolve();
	}
	return knex.schema.createTable('tweets', (table) => {
		table.increments('id').primary();
		table.string('key', 24).unique().notNullable();
		table.binary('data').notNullable();

		table.timestamps(true, true);
	});
});

knex.schema.hasTable('history').then((exists) => {
	if(exists) {
		return Promise.resolve();
	}
	return knex.schema.createTable('history', (table) => {
		table.increments('id').primary();
		table.string('key', 24).notNullable();

		table.timestamps(true, true);
	});
});

knex.schema.hasTable('filters').then((exists) => {
	if(exists) {
		return Promise.resolve();
	}
	return knex.schema.createTable('filters', (table) => {
		table.increments('id').primary();
		table.integer('type').notNullable();
		table.binary('data').notNullable();

		table.timestamps(true, true);
	});
});

export class Database {
	private static knex: Knex = knex;

	private static queue: Tweet[] = [];

	public static async initialize() {
		try {
			while(true) {
				const tweet = Database.queue.shift();

				if(tweet !== undefined) {
					await Database.insertTweet(tweet);
				}

				await new Promise((resolve) => {
					setTimeout(resolve, 100);
				});
			}
		}
		catch(err) {
			console.log(err);
		}
	}

	private static checkUnique(tweet: Tweet) {
		return new Promise((resolve, reject) => {
			this.knex('tweets').where({
				'key': tweet.id_str,
			}).then((data: string[]) => {
				if(data.length === 1) {
					resolve(false);
				}
				resolve(true);
			}).catch((err) => {
				reject(err);
			});
		});
	}

	public static addQueue(tweet: Tweet) {
		this.queue.unshift(tweet);
	}

	private static insertTweet(tweet: Tweet) {
		return this.checkUnique(tweet).then((isUnique) => {
			if(isUnique === false) {
				return Promise.resolve();
			}

			return deflate(tweet).then((data) => {
				return this.knex('tweets').insert({
					'key': tweet.id_str,
					'data': data,
				});
			}).then((rows: number[]) => {
				Socket.emit(SocketEventType.INSERT_TWEET, tweet.id_str);
			});
		}).catch((err) => {
			console.error(err);
		});
	}

	public static getTweets(key: string) {
		return new Promise((resolve, reject) => {
			this.knex('tweets').where('key', '>=', key).orderBy('key', 'asc').limit(100).then((rows: DataRow[]) => {
				return Promise.all(rows.map((row) => {
					return inflate<Tweet>(row.data);
				}));
			}).then((rows: Tweet[]) => {
				resolve(rows);
			}).catch((err) => {
				reject(err);
			});
		});
	}

	public static getHistory() {
		return new Promise<string>((resolve, reject) => {
			this.knex('history').orderBy('id', 'desc').limit(1).then((rows: Array<{
				key: string;
			}>) => {
				if(rows.length === 0) {
					resolve('1');
				}
				else {
					resolve(rows[0].key);
				}
			}).catch((err) => {
				reject(err);
			});
		});
	}

	public static setHistory(key: string) {
		return new Promise((resolve, reject) => {
			this.knex('history').insert({
				'key': key,
			}).then((rows: number[]) => {
				Socket.emit(SocketEventType.UPDATE_HISTORY, key);
				resolve();
			}).catch((err) => {
				reject(err);
			});
		});
	}

	private static getFilteredUserList(type: FilterType) {
		return new Promise((resolve, reject) => {
			return this.knex('filters').where({
				'type': type,
			}).orderBy('id', 'desc').limit(1).then((rows) => {
				if(rows.length === 0) {
					reject();
				}
				resolve(rows.pop().data);
			});
		}).then((data) => {
			return inflate(data as any);
		}).catch(() => {
			return Promise.resolve([]);
		});
	}

	public static getBlockedUserList() {
		return this.getFilteredUserList(FilterType.BLOCK);
	}

	public static getMutedUserList() {
		return this.getFilteredUserList(FilterType.MUTE);
	}

	public static async setFilteredUserList(type: FilterType, users: User[]) {
		try {
			const data = await deflate(users);

			return new Promise((resolve, reject) => {
				this.knex('filters').insert({
					'type': type,
					'data': data,
				}).then((rows) => {
					resolve(rows);
				}).catch((err) => {
					reject(err);
				});
			});
		}
		catch(err) {
			return Promise.reject(err);
		}
	}

	public static async setBlockedUserList(users: User[]) {
		return this.setFilteredUserList(FilterType.BLOCK, users);
	}

	public static async setMutedUserList(users: User[]) {
		return this.setFilteredUserList(FilterType.MUTE, users);
	}
}
