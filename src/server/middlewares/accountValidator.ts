import Express from 'express';
import { accountValidator } from '~/shared/helpers';

const router = Express.Router();

router.use('*', accountValidator);

export default router;
