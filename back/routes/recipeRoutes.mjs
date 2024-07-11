import express from 'express';
import { isUser } from '../middlewares/authorizationMiddleware.mjs';
import { postRecipe,deleteRecipe, patchRecipe } from '../controllers/recipesController.mjs';

const router = express.Router();

router.route('/').post(postRecipe).delete(deleteRecipe).patch(patchRecipe)

export default router;
