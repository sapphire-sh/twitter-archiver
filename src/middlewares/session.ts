import Express from 'express';

import localforage from 'localforage';

const router = Express.Router();

router.use((req, _, next) => {
	req.session = localforage;

	next();
});

export default router;
