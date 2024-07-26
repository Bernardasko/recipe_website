import express from 'express'
import {isUser} from '../middlewares/authorizationMiddleware.mjs'
import { deleteLike, postLike, getLikeCount, checkIfLiked } from '../controllers/likesController.mjs'

const router = express.Router()

router.route('/count/:recipeid').get(getLikeCount)
router.route('/check/:recipeid/:userid').get( checkIfLiked);
router.route('/:recipeid/:userid').delete(isUser, deleteLike).post(isUser, postLike)

export default router