import * as request from 'supertest';

import {
	expect,
} from 'chai';

import Express from 'express';

import accountValidator from './accountValidator';

describe('./utils/accountValidator.ts', () => {
	describe('account validator', () => {
		const app = Express();

		const session = {
			'isValid': false,
		};

		before(() => {
			app.use((req, _, next) => {
				req.session!.isValid = session.isValid;

				next();
			});

			app.use('*', accountValidator);

			[
				'/auth',
				'/auth/callback',
				'*',
			].forEach((e) => {
				app.get(e, (_, res) => {
					res.json({
						'path': e,
					});
				});
			});
		});

		it('invalid session at /', () => {
			session.isValid = false;

			return request(app).get('/')
			.then((res) => {
				expect(res.status).to.equal(302);
			});
		});

		it('invalid session at /auth', () => {
			session.isValid = false;

			return request(app).get('/auth')
			.then((res) => {
				expect(res.body).to.equal({
					'path': '/auth',
				});
			});
		});

		it('invalid session at /auth/callback', () => {
			session.isValid = false;

			return request(app).get('/auth/callback')
			.then((res) => {
				expect(res.body).to.equal({
					'path': '/auth/callback',
				});
			});
		});

		it('valid session at /', () => {
			session.isValid = true;

			return request(app).get('/')
			.then((res) => {
				expect(res.body).to.equal({
					'path': '*',
				});
			});
		});
	});
});
