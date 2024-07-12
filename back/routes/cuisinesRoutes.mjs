import express from 'express'
import {getRecipesByCuisineId, getAllcusines} from '../controllers/cuisinesController.mjs'

const router = express.Router()

router.route('/').get(getAllcusines)
router.route('/:cuisineId/recipes').get(getRecipesByCuisineId)

export default router