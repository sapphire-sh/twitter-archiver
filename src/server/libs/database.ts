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

	public static initialize() {
		let prevCount = -1;

		Promise.resolve().then(function loop() {
			return Promise.resolve().then(() => {
				const currCount = Database.queue.length;

				const tweet = Database.queue.shift();

				if(prevCount !== currCount) {
					// Socket.emit(SocketEventType.QUEUE_COUNT, `${currCount}`);
				}
				prevCount = currCount;

				if(tweet !== undefined) {
					return Database.insertTweet(tweet);
				}

				return Promise.resolve();
			}).catch((err) => {
				console.log(err);
			}).then(() => {
				setTimeout(loop, 100);
			});
		}).catch((err) => {
			console.log(err);
		});
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

	public static getBlockedUsersList() {
		return new Promise((resolve, reject) => {
			return this.knex('filters').where({
				'type': 1,
			}).orderBy('id', 'desc').limit(1).then((rows) => {
				if(rows.length === 0) {
					reject();
				}
				resolve(rows.pop().data);
			});
		}).then((data) => {
			return deflate(data);
		}).catch(() => {
			return Promise.resolve([]);
		});
	}

	public static setBlockedUsersList(users: User[]) {
		return new Promise((resolve, reject) => {
			this.knex('filters').insert({
				'type': 1,
			}).then((rows) => {
				resolve(rows);
			}).catch((err) => {
				reject(err);
			});
		});
	}

	public static getMutedUsersList() {
		return new Promise((resolve, reject) => {
			return this.knex('filters').where({
				'type': 2,
			}).orderBy('id', 'desc').limit(1).then((rows) => {
				if(rows.length === 0) {
					reject();
				}
				resolve(rows.pop().data);
			});
		}).then((data) => {
			return deflate(data);
		}).catch(() => {
			return Promise.resolve([]);
		});
	}

	public static setMutedUsersList(users: User[]) {
		return new Promise((resolve, reject) => {
			this.knex('filters').insert({
				'type': 2,
			}).then((rows) => {
				resolve(rows);
			}).catch((err) => {
				reject(err);
			});
		});
	}
}
