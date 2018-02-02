import Database from './database';

describe('./libs/database.ts', () => {
	test('test', () => {
	});

	afterAll(() => {
		Database.client().quit();
	});
});
