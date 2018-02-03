import Database from './database';

describe('./libs/database.ts', () => {
	it('test', () => {
	});

	after(() => {
		Database.client().quit();
	});
});
