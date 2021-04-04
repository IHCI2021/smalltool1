import { Router } from 'express';
import * as MaterialController from '../controllers/material.controller';
const router = new Router();


router.route('/getList').get(MaterialController.getAffairsByCount);

router.route('/findItem').get(MaterialController.getAffairsByItemName);

router.route('/removeOne').post(MaterialController.removeAffairsByItemCode);

router.route('/removeMany').post(MaterialController.removeAffairsByItemCodes);

router.route('/updateItem').post(MaterialController.updateItem);

router.route('/getItemByCode').get(MaterialController.getOneAffairs);

router.route('/material').post(MaterialController.setMaterialForm);
export default router;
