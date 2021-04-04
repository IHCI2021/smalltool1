import { Router } from 'express';
import * as TestController from '../controllers/test.controller';

const router = new Router();

router.route('/posts').get(TestController.getPosts);

router.route('/getSearchResults/:LeafId').get(TestController.getResults);

// router.route('/adminLogin').get(TestController.testLogin)

export default router;
