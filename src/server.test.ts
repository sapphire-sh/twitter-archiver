import request from 'supertest';

import {
	expect,
} from 'chai';

import Server from './server';

import Database from './libs/database';

describe('./server.ts', () => {
	const {
		server,
	} = new Server(0);

	it('server', () => {
		return request(server).get('/')
		.then((res) => {
			expect(res.body).to.equal({});
		});
	});

	after(() => {
		Database.client().quit();
		server.close();
	});
});
