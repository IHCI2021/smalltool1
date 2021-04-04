import { Router } from 'express';
import * as PostController from '../controllers/citizen.controller';
const router = new Router();

router.route('/getResult/:LeafId').get(PostController.getMaterals);

router.route('/getSearchResults/:searchMessage').get(PostController.getSearchResult);

export default router;
