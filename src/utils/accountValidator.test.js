import request from 'supertest';

import Express from 'express';

import accountValidator from './accountValidator';

describe('./utils/accountValidator.js', () => {
	describe('account validator', () => {
		const app = Express();

		const session = {
			'isValid': false,
		};

		beforeAll(() => {
			app.use((req, res, next) => {
				req.session = session;

				next();
			});

			app.use('*', accountValidator);

			[
				'/auth',
				'/auth/callback',
				'*',
			].forEach((e) => {
				app.get(e, (req, res) => {
					res.json({
						'path': e,
					});
				});
			});
		});

		test('invalid session at /', () => {
			session.isValid = false;

			return request(app).get('/')
			.then((res) => {
				expect(res.status).toBe(302);
			});
		});

		test('invalid session at /auth', () => {
			session.isValid = false;

			return request(app).get('/auth')
			.then((res) => {
				expect(res.body).toEqual({
					'path': '/auth',
				});
			});
		});

		test('invalid session at /auth/callback', () => {
			session.isValid = false;

			return request(app).get('/auth/callback')
			.then((res) => {
				expect(res.body).toEqual({
					'path': '/auth/callback',
				});
			});
		});

		test('valid session at /', () => {
			session.isValid = true;

			return request(app).get('/')
			.then((res) => {
				expect(res.body).toEqual({
					'path': '*',
				});
			});
		});
	});
});
