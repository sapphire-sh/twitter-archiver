import cookieSession from 'cookie-session';
import Express from 'express';

const router = Express.Router();

router.use(
  cookieSession({
    name: 'session',
    secret: process.env.NODE_ENV === 'test' ? 'test' : __env.CONSUMER_KEY,
    maxAge: 7 * 24 * 3600 * 1000,
  })
);

export default router;
