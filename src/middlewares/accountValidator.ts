import Express from 'express';

import accountValidator from '../utils/accountValidator';

const router = Express.Router();

router.use('*', accountValidator);

export default router;
