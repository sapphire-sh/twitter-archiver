import Knex from 'knex';

import {
	Socket,
} from '../libs';

import {
	Tweet,
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

export class Database {
	private static knex: Knex = knex;

	private static queue: Tweet[] = [];

	public static initialize() {
		Promise.resolve(0).then(function loop(prevCount) {
			return Promise.resolve().then(() => {
				const currCount = Database.queue.length;
				console.log(prevCount + ' ' + currCount);
				if(prevCount !== currCount) {
					Socket.emit(SocketEventType.QUEUE_COUNT, `${currCount}`);
				}

				const tweet = Database.queue.shift();
				if(tweet !== undefined) {
					return Database.insertTweet(tweet);
				}

				return Promise.resolve();
			}).catch((err) => {
				console.log(err);
			}).then(() => {
				const currCount = Database.queue.length;

				setTimeout(() => {
					loop(currCount);
				}, 100);
			});
		}).catch((err) => {
			console.log(err);
		});
	}

	private static checkUnique(tweet: Tweet) {
		return new Promise((resolve, reject) => {
			return this.knex('tweets').where({
				'key': tweet.id_str,
			}).then((data: string[]) => {
				if(data.length === 1) {
					resolve(false);
					return;
				}
				resolve(true);
			}).catch((err) => {
				reject(err);
			});
		});
	}

	public static addQueue(tweet: Tweet) {
		this.queue.push(tweet);
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
			return this.knex('tweets').where('key', '>=', key).orderBy('key', 'asc').limit(100).then((rows: DataRow[]) => {
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

	public static setHistory(key: string) {
		return new Promise((resolve, reject) => {
			return this.knex('history').insert({
				'key': key,
			}).then((rows: number[]) => {
				Socket.emit(SocketEventType.UPDATE_HISTORY, key);
				resolve();
			}).catch((err) => {
				reject(err);
			});
		});
	}

	public static getHistory() {
		return new Promise<string>((resolve, reject) => {
			return this.knex('history').orderBy('id', 'desc').limit(1).then((rows: Array<{
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
}
