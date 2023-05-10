import request from 'supertest';
import { Server } from './server';

describe('./server.ts', () => {
  const { server } = new Server(0);

  it('server', async () => {
    const res = await request(server).get('/');
    expect(res.body).toEqual({});
  });

  afterEach(() => {
    server.close();
  });
});
