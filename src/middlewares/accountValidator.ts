import * as Express from 'express';

import {
	accountValidator,
} from '../helpers';

const router = Express.Router();

router.use('*', accountValidator);

export default router;
