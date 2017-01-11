import { Router } from 'express';
import * as signupController from '../controllers/signup.controller';
const router = new Router();

router.route('/userRegistration').post(signupController.addUser);

router.route('/userList').get(signupController.getPosts);

router.route('/deletePosts/:_id').delete(signupController.deleteList);

export default router;