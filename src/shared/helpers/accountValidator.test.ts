import supertest from 'supertest';

import {
	expect,
} from 'chai';

import Express from 'express';

import {
	accountValidator,
} from './accountValidator';

describe('./utils/accountValidator.ts', () => {
	describe('account validator', () => {
		const app = Express();

		const request = supertest(app);

		const session: any = {};

		beforeEach(() => {
			app.use((req, _, next) => {
				req.session = session;

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

			return request.get('/').then((res) => {
				expect(res.status).to.equal(302);
				// expect(res.status).to.equal(200);
			});
		});

		it('invalid session at /auth', () => {
			session.isValid = false;

			return request.get('/auth').then((res) => {
				expect(res.body).to.deep.equal({
					'path': '/auth',
				});
			});
		});

		it('invalid session at /auth/callback', () => {
			session.isValid = false;

			return request.get('/auth/callback').then((res) => {
				expect(res.body).to.deep.equal({
					'path': '/auth/callback',
				});
			});
		});

		it('valid session at /', () => {
			session.isValid = true;

			return request.get('/').then((res) => {
				expect(res.body).to.deep.equal({
					'path': '*',
				});
			});
		});
	});
});
