import express from 'express';
import { isUser, isAdmin } from '../middlewares/authorizationMiddleware.mjs';
import { postRecipe,deleteRecipe, patchRecipe } from '../controllers/recipesController.mjs';

const router = express.Router();

router.route('/').post(isUser, postRecipe).delete(isUser, deleteRecipe).patch(patchRecipe)

export default router;
