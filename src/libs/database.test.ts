import Database from './database';

describe('./libs/database.js', () => {
	test('test', () => {
	});

	afterAll(() => {
		Database.client().quit();
	});
});
