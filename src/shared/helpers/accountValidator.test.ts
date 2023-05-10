import Express from 'express';
import supertest from 'supertest';
import { accountValidator } from './accountValidator';

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

      ['/auth', '/auth/callback', '*'].forEach((e) => {
        app.get(e, (_, res) => {
          res.json({
            path: e,
          });
        });
      });
    });

    test('invalid session at /', async () => {
      session.isValid = false;

      const res = await request.get('/');
      expect(res.status).toBe(302);
    });

    test('invalid session at /auth', async () => {
      session.isValid = false;

      const res = await request.get('/auth');
      expect(res.body).toEqual({
        path: '/auth',
      });
    });

    test('invalid session at /auth/callback', async () => {
      session.isValid = false;

      const res = await request.get('/auth/callback');
      expect(res.body).toEqual({
        path: '/auth/callback',
      });
    });

    test('valid session at /', async () => {
      session.isValid = true;

      const res = await request.get('/');
      expect(res.body).toEqual({
        path: '*',
      });
    });
  });
});
