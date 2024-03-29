import knex, { Knex } from 'knex';
import { deflate, inflate } from '~/server/helpers';
import { Socket } from '~/server/libs';
import { SocketEventType, Tweet, User } from '~/shared/models';

interface DataRow {
  id: string;
  data: Buffer;
}

enum FilterType {
  BLOCK = 1,
  MUTE,
}

export class Database {
  private static knex: Knex;
  private static queue: Tweet[];
  private static shouldProcess: boolean;

  public static async initialize(config?: Knex.Config): Promise<void> {
    /* istanbul ignore if */
    if (config === undefined) {
      config = {
        client: 'mysql',
        connection: {
          host: __env.DATABASE_HOST ?? 'localhost',
          user: __env.DATABASE_USER,
          password: __env.DATABASE_PASSWORD,
          database: __env.DATABASE_NAME,
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
        const tweet = Database.queue.shift();
        if (tweet !== undefined) {
          await Database.insertTweet(tweet);
        }
        await new Promise((resolve) => {
          setTimeout(resolve, 100);
        });
      }
    } catch (err) {
      /* istanbul ignore next */
      console.log(err);
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
    } catch (err) {
      /* istanbul ignore next */
      console.log(err);
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
      /* istanbul ignore next */
      if (__test === false) {
        Socket.emit(SocketEventType.INSERT_TWEET, tweet.id_str);
      }
    } catch (err) {
      /* istanbul ignore next */
      console.log(err);
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
    } catch (err) {
      /* istanbul ignore next */
      console.log(err);
      return [];
    }
  }

  public static async getHistory(): Promise<string> {
    try {
      const rows: { key: string }[] = await this.knex('history').orderBy('id', 'desc').limit(1);
      return rows.length === 0 ? '1' : rows[0].key;
    } catch (err) {
      /* istanbul ignore next */
      console.log(err);
      return '1';
    }
  }

  public static async setHistory(key: string): Promise<void> {
    try {
      await this.knex('history').insert({
        key,
      });
      Socket.emit(SocketEventType.UPDATE_HISTORY, key);
    } catch (err) {
      console.log(err);
    }
  }

  private static async getFilteredUserList(type: FilterType): Promise<User[]> {
    try {
      const rows = await this.knex('filters')
        .where({
          type,
        })
        .orderBy('id', 'desc')
        .limit(1);
      return rows.length === 0 ? [] : inflate<User[]>(rows.pop().data);
    } catch (err) {
      console.log(err);
      return [];
    }
  }

  public static getBlockedUserList(): Promise<User[]> {
    return this.getFilteredUserList(FilterType.BLOCK);
  }

  public static getMutedUserList(): Promise<User[]> {
    return this.getFilteredUserList(FilterType.MUTE);
  }

  public static async setFilteredUserList(type: FilterType, users: User[]): Promise<void> {
    try {
      await this.knex('filters').insert({
        type,
        data: await deflate(users),
      });
    } catch (err) {
      console.log(err);
    }
  }

  public static setBlockedUserList(users: User[]): Promise<void> {
    return this.setFilteredUserList(FilterType.BLOCK, users);
  }

  public static setMutedUserList(users: User[]): Promise<void> {
    return this.setFilteredUserList(FilterType.MUTE, users);
  }

  public static async getTweet(key: string): Promise<Tweet[]> {
    try {
      const rows: DataRow[] = await this.knex('tweets').where({
        key,
      });
      if (rows.length === 1) {
        return Promise.all(
          rows.map((row) => {
            return inflate<Tweet>(row.data);
          })
        );
      }
      return [];
    } catch (err) {
      console.log(err);
      return [];
    }
  }

  public static async getLastTweet(): Promise<Tweet | null> {
    try {
      const rows: DataRow[] = await this.knex('tweets').orderBy('id', 'desc').limit(1);
      if (rows.length !== 1) {
        return null;
      }

      return inflate<Tweet>(rows[0].data);
    } catch (err) {
      console.log(err);
      return null;
    }
  }
}
