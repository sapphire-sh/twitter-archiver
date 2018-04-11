import Express from 'express';

const router = Express.Router();

const session: any = {};

router.use((req, _, next) => {
	req.session = session;

	next();
});

export default router;
