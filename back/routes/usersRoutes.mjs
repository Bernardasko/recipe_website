import express from 'express';

import {
  signupUser,
  loginUser,
  test,
  addFollower,
  removeFollower,
  getFollowers,
  isFollowing
} from '../controllers/usersController.mjs';
import { isAdmin, isUser } from '../middlewares/authorizationMiddleware.mjs';

const router = express.Router();

router.route('/signup').post(signupUser);
router.route('/login').post(loginUser);
router.route('/test').get(isUser, test);
router.route('/addFollower').post(isUser, addFollower);
router.route('/removeFollower').post(isUser, removeFollower);
router.route('/getFollowers').get(isUser, getFollowers);
router.route('/isFollowing/:profileId').get(isUser, isFollowing)


export default router;
