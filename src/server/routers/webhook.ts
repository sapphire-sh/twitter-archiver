import * as Express from 'express';

const router = Express.Router();

router.get('/', (req, res) => {
	console.log(req);
	console.log(res);
	res.json(true);
});

export default router;
