import express from 'express'
import { isUser, isAdmin } from '../middlewares/authorizationMiddleware.mjs'
import { getCategoryByName, getRecipesByCategoryId, postCategory } from '../controllers/categorysController.mjs'

const router = express.Router()

router.route('/').get(getCategoryByName).post(postCategory)
router.route('/:categoryId/recipes').get(getRecipesByCategoryId)


export default router