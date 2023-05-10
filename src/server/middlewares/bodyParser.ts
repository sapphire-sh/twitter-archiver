import bodyParser from 'body-parser';
import Express from 'express';

const router = Express.Router();

router.use(bodyParser.json());
router.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

export default router;
