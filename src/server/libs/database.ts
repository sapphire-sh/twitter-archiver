import Promise from 'bluebird';
import Knex from 'knex';

import {
	Tweet,
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
		table.bigInteger('id').primary().unique().notNullable();
		table.binary('data').notNullable();

		table.timestamps(true, true);
	});
})

knex.schema.hasTable('history').then((exists) => {
	if(exists) {
		return Promise.resolve();
	}
	return knex.schema.createTable('history', (table) => {
		table.bigInteger('id').primary().notNullable();

		table.timestamps(true, true);
	});
});

export class Database {
	private static knex: Knex = knex;

	private static queue: Tweet[] = [];

	public static initialize() {
		Promise.resolve().then(function loop(): Promise<any> {
			return Promise.resolve().then(() => {
				const tweet = Database.queue.shift();
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
			return this.knex('tweets').where({
				'id': tweet.id_str,
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
					'id': tweet.id_str,
					'data': data,
				});
			});
		}).catch((err) => {
			console.error(err);
		});
	}

	public static getTweets(id: string) {
		return new Promise((resolve, reject) => {
			return this.knex('tweets').where('id', '>=', id).orderBy('id', 'asc').limit(100).then((rows: DataRow[]) => {
				return Promise.all(rows.map((row) => {
					return inflate(row.data);
				}));
			}).then((data) => {
				const tweets = data as Tweet[];
				resolve(tweets);
			}).catch((err) => {
				reject(err);
			});
		});
	}

	public static getLatestTweet() {
		return new Promise((resolve, reject) => {
			return this.knex('tweets').orderBy('id').limit(1).then((rows: DataRow[]) => {
				return Promise.all(rows.map((row) => {
					return inflate(row.data);
				}));
			}).then((data) => {
				const tweets = data as Tweet[];
				if(tweets.length === 1) {
					resolve(tweets[0]);
				}
				resolve(undefined);
			}).catch((err) => {
				reject(err);
			});
		})
	}
}
