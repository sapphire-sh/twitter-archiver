import request from 'supertest';

import {
	expect,
} from 'chai';

import {
	Server,
} from './server';

describe('./server.ts', () => {
	const {
		server,
	} = new Server(0);

	it('server', () => {
		return request(server).get('/')
		.then((res) => {
			expect(res.body).to.deep.equal({});
		});
	});

	afterEach(() => {
		server.close();
	});
});
