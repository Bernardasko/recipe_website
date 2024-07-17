import express from 'express'
import {getRecipesByCuisineId, getAllcusines, displayAllCusinesWithRecipes} from '../controllers/cuisinesController.mjs'

const router = express.Router()

router.route('/').get(getAllcusines)
router.route('/withRecipes').get(displayAllCusinesWithRecipes)
router.route('/:cuisineId').get(getRecipesByCuisineId)

export default router