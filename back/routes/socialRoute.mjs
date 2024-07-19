import express from 'express'
import { addReview, getReviewByRecipeId, paginateCommentByRecipeId } from '../controllers/socialController.mjs'
import {isUser} from '../middlewares/authorizationMiddleware.mjs'


const router = express.Router()

router.route('/').post(isUser, addReview)
router.route('/follow')
// router.route('/:id').get(isUser, getReviewByRecipeId)
router.route('/:recipeId').get(isUser, paginateCommentByRecipeId)

export default router