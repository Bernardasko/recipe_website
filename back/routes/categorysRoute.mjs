import express from 'express'
import { isUser, isAdmin } from '../middlewares/authorizationMiddleware.mjs'
import { getRecipesByCategoryId, getAllCategories, addCategory, deleteCategory, searchCategory } from '../controllers/categoriesController.mjs'

const router = express.Router()

router.route('/').get(isUser, getAllCategories).post(isAdmin, addCategory)
router.route('/searchCategory/:categoryName').get( searchCategory)
router.route('/:categoryId/recipes').get(getRecipesByCategoryId)
router.route('/:categoryId').delete(isAdmin, deleteCategory).get(getRecipesByCategoryId)


export default router