import Express from 'express';

import bodyParser from 'body-parser';

const router = Express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
	'extended': true,
}));

export default router;
