import express from 'express'
import { isUser, isAdmin } from '../middlewares/authorizationMiddleware.mjs'
import { getRecipesByCategoryId, getAllCategories, addCategory, deleteCategory } from '../controllers/categoriesController.mjs'

const router = express.Router()

router.route('/:categoryId/recipes').get(getRecipesByCategoryId)
router.route('/').get(getAllCategories).post(isAdmin, addCategory)
router.route('/:categoryId').delete(isAdmin, deleteCategory)


export default router