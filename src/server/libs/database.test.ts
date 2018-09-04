import fs from 'fs';
import path from 'path';

import {
	expect,
} from 'chai';

import {
	Database,
} from './database';

import tweet from '../../tweet.json';

describe('./libs/database.ts', () => {
	const databasePath = path.resolve(__dirname, './test.sqlite');

	beforeAll(async () => {
		await Promise.all([
			Database.initialize({
				'client': 'sqlite3',
				'connection': {
					'filename': databasePath,
				},
				'useNullAsDefault': true,
			}),
		]);
		Database.start();
	});

	it('insert tweet', async (done) => {
		Database.addQueue(tweet);

		setTimeout(done, 1000);
	});

	it('insert tweet - duplicate', async (done) => {
		Database.addQueue(tweet);

		setTimeout(done, 1000);
	});

	it('get tweets', async () => {
		const tweets = await Database.getTweets(tweet.id_str);
		expect(tweets).to.have.lengthOf(1);
		expect(tweets[0]).to.deep.equal(tweet);
	});

	afterAll(() => {
		Database.stop();
		fs.unlinkSync(databasePath);
	});
});
