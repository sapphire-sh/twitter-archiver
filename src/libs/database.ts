import Promise from 'bluebird';
import Knex from 'knex';

import {
	Tweet,
} from '../models';

import zlib from '../utils/zlib';

interface DataRow {
	id: string;
	data: string;
}

const knex = Knex({
	'client': 'sqlite3',
	'connection': {
		'filename': './tweets.sqlite',
	},
	'useNullAsDefault': true,
});

knex.schema.hasTable('tweets').then((exists) => {
	if(exists) {
		return Promise.resolve();
	}
	return knex.schema.createTable('tweets', (table) => {
		table.bigInteger('id').primary().unique().notNullable();
		table.string('data').notNullable();

		table.timestamps(true, true);
	});
})

export class Database {
	private static knex: Knex = knex;

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

	public static insertTweet(tweet: Tweet) {
		return this.checkUnique(tweet).then((isUnique) => {
			if(isUnique === false) {
				return Promise.resolve();
			}

			return zlib.deflate(tweet).then((data) => {
				return this.knex('tweets').insert({
					'id': tweet.id_str,
					'data': data,
				});
			});
		}).catch((err) => {
			console.error(err);
		});
	}

	public static getTweets(min: string, max: string) {
		return new Promise((resolve, reject) => {
			return this.knex('tweets').whereBetween('id', [
				min,
				max,
			]).then((rows: DataRow[]) => {
				return Promise.all(rows.map((row) => {
					return zlib.inflate(row.data);
				}));
			}).then((data) => {
				const tweets = <Tweet[]>data;
				resolve(tweets);
			}).catch((err) => {
				reject(err);
			});
		});
	}
}
