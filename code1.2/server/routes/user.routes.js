import { Router } from 'express';
import * as UserController from '../controllers/user.controller';
const router = new Router();

//登录
router.route('/login').post(UserController.login);

router.route('/create').post(UserController.createUser);

router.route('/update_password').post(UserController.updatePassword);

router.route('/update_password_by_root').post(UserController.updatePasswordByRoot);


router.route('/get_user_list').get(UserController.getUserByRoot)



router.route('/logout').get(UserController.logout)
export default router;
