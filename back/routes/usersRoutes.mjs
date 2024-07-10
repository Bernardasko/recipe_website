import express from 'express';

import {
  signupUser,
  loginUser,
  test,
} from '../controllers/usersController.mjs';
import { isAdmin, isUser } from '../middlewares/authorizationMiddleware.mjs';

const router = express.Router();

router.route('/signup').post(signupUser);
router.route('/login').post(loginUser);
router.route('/test').get(isUser, test);

export default router;
