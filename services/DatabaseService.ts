import { knex, Knex } from 'knex';
import { deflate, inflate } from '../utils';
import { SocketEventType, Tweet } from '../models';
import { SocketService } from './SocketService';

interface DataRow {
	id: string;
	data: Buffer;
}

export class DatabaseService {
	private static knex: Knex;
	private static queue: Tweet[];
	private static shouldProcess: boolean;

	public static async initialize(config?: Knex.Config): Promise<void> {
		if (config === undefined) {
			config = {
				client: 'mysql2',
				connection: {
					host: process.env.DATABASE_HOST ?? 'localhost',
					user: process.env.DATABASE_USER,
					password: process.env.DATABASE_PASSWORD,
					database: process.env.DATABASE_NAME,
				},
				useNullAsDefault: true,
			};
		}

		this.knex = knex(config);

		{
			const exists = await this.knex.schema.hasTable('tweets');
			if (exists === false) {
				await this.knex.schema.createTable('tweets', (table) => {
					table.increments('id').primary();
					table.string('key', 24).unique().notNullable();
					table.binary('data').notNullable();
					table.timestamps(true, true);
				});
			}
		}

		{
			const exists = await this.knex.schema.hasTable('history');
			if (exists === false) {
				await this.knex.schema.createTable('history', (table) => {
					table.increments('id').primary();
					table.string('key', 24).notNullable();
					table.timestamps(true, true);
				});
			}
		}

		{
			const exists = await this.knex.schema.hasTable('filters');
			if (exists === false) {
				await this.knex.schema.createTable('filters', (table) => {
					table.increments('id').primary();
					table.integer('type').notNullable();
					table.binary('data').notNullable();
					table.timestamps(true, true);
				});
			}
		}

		this.queue = [];
		this.shouldProcess = true;
	}

	public static async start(): Promise<void> {
		try {
			while (this.shouldProcess) {
				const tweet = DatabaseService.queue.shift();
				if (tweet !== undefined) {
					await DatabaseService.insertTweet(tweet);
				}
				await new Promise((resolve) => {
					setTimeout(resolve, 100);
				});
			}
		} catch (error) {
			console.log(error);
		}
	}

	public static stop() {
		this.shouldProcess = false;
	}

	private static async checkUnique(tweet: Tweet): Promise<boolean> {
		try {
			const data: string[] = await this.knex('tweets').where({
				key: tweet.id_str,
			});
			return data.length === 0;
		} catch (error) {
			console.log(error);
			return false;
		}
	}

	public static addQueue(tweet: Tweet): void {
		this.queue.unshift(tweet);
	}

	private static async insertTweet(tweet: Tweet): Promise<void> {
		try {
			const isUnique = await this.checkUnique(tweet);
			if (isUnique === false) {
				return;
			}
			await this.knex('tweets').insert({
				key: tweet.id_str,
				data: await deflate(tweet),
			});
			SocketService.emit(SocketEventType.INSERT_TWEET, tweet.id_str);
		} catch (error) {
			console.log(error);
		}
	}

	public static async getTweets(key: string): Promise<Tweet[]> {
		try {
			const rows: DataRow[] = await this.knex('tweets').where('key', '>=', key).orderBy('key', 'asc').limit(100);
			return await Promise.all(
				rows.map((row) => {
					return inflate<Tweet>(row.data);
				})
			);
		} catch (error) {
			console.log(error);
			return [];
		}
	}

	public static async getHistory(): Promise<string> {
		try {
			const rows: { key: string }[] = await this.knex('history').orderBy('id', 'desc').limit(1);
			return rows.length === 0 ? '1' : rows[0].key;
		} catch (error) {
			console.log(error);
			return '1';
		}
	}

	public static async setHistory(key: string): Promise<void> {
		try {
			await this.knex('history').insert({
				key: key,
			});
			SocketService.emit(SocketEventType.UPDATE_HISTORY, key);
		} catch (error) {
			console.log(error);
		}
	}

	public static async getTweet(key: string): Promise<Tweet[]> {
		try {
			const rows: DataRow[] = await this.knex('tweets').where({
				key: key,
			});
			if (rows.length === 1) {
				return Promise.all(
					rows.map((row) => {
						return inflate<Tweet>(row.data);
					})
				);
			}
			return [];
		} catch (error) {
			console.log(error);
			return [];
		}
	}
}
