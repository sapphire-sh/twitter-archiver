import Express from 'express';

import morgan from 'morgan';

const router = Express.Router();

/* istanbul ignore if */
if(process.env.NODE_ENV !== 'test') {
	router.use(morgan('common'));
}

export default router;
