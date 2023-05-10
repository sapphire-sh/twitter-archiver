import fs from 'fs';
import path from 'path';
import tweet from '~/tweet.json';
import { Database } from './database';

describe('./libs/database.ts', () => {
  const databasePath = path.resolve(__dirname, './test.sqlite');

  beforeAll(async () => {
    await Promise.all([
      Database.initialize({
        client: 'sqlite3',
        connection: {
          filename: databasePath,
        },
        useNullAsDefault: true,
      }),
    ]);
    Database.start();
  });

  test('insert tweet', (done) => {
    Database.addQueue(tweet as any);

    setTimeout(done, 1000);
  });

  test('insert tweet - duplicate', (done) => {
    Database.addQueue(tweet as any);

    setTimeout(done, 1000);
  });

  test('get tweets', async () => {
    const tweets = await Database.getTweets(tweet.id_str);
    expect(tweets).toHaveLength(1);
    expect(tweets[0]).toEqual(tweet);
  });

  afterAll(() => {
    Database.stop();
    fs.unlinkSync(databasePath);
  });
});
