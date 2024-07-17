import {
  pg_addReview,
  pg_getReviewByRecipeId,
} from '../models/socialModel.mjs';

export const addReview = async (req, res) => {
  try {
    const { id: userId } = req.user;
    console.log(req.user);
    const { comment, recipeId, rating } = req.body;
    const review = await pg_addReview(recipeId, userId, comment, rating);
    console.log(review);
    res.status(201).json(review);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error });
  }
};

export const getReviewByRecipeId = async (req, res) => {
  try {
    const { id: recipeId } = req.params;
    const recipeReviews = await pg_getReviewByRecipeId(recipeId);
    console.log(recipeReviews);
    res.status(200).json(recipeReviews);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error });
  }
};