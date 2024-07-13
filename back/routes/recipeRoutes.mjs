import express from 'express';
import { isUser, isAdmin } from '../middlewares/authorizationMiddleware.mjs';
import {
  postRecipe,
  deleteRecipe,
  patchRecipe,
  getRecipes,
} from '../controllers/recipesController.mjs';

const router = express.Router();

router.route('/').get(isUser, getRecipes).post(isUser, postRecipe);
router.route('/:id').delete(isUser, deleteRecipe).patch(isUser, patchRecipe);

export default router;
