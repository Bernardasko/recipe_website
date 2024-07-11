import express from 'express'
import {getRecipesByCuisineId} from '../controllers/cuisinesController.mjs'

const router = express.Router()

router.route('/:cuisineId/recipes').get(getRecipesByCuisineId)

export default router