import request from 'supertest';

import Server from './server';

import Database from './libs/database';

describe('./server.ts', () => {
	const {
		server,
	} = new Server(0);

	test('server', () => {
		return request(server).get('/')
		.then((res) => {
			expect(res.body).toEqual({});
		});
	});

	afterAll(() => {
		Database.client().quit();
		server.close();
	});
});
