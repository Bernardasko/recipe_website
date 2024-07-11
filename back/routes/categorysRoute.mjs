import express from 'express'
import { isUser, isAdmin } from '../middlewares/authorizationMiddleware.mjs'
import { getRecipesByCategoryId } from '../controllers/categorysController.mjs'

const router = express.Router()

router.route('/:categoryId/recipes').get(getRecipesByCategoryId)

export default router