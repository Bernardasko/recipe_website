import { json } from 'express';
import {
  pg_addReview,
  pg_getReviewByRecipeId,
  pg_paginateCommentByRecipeId,
} from '../models/socialModel.mjs';

export const addReview = async (req, res) => {
  try {
    const { id: userId } = req.user;
    console.log(req.user);
    const { comment, recipeId, rating } = req.body;
    const review = await pg_addReview(recipeId, userId, comment, rating);
    if (!review.recipeid) {
      res.status(404).json({ message: 'Could not leave a review' });
    }
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

export const paginateCommentByRecipeId = async (req, res) => {
  try {
    const { recipeId } = req.params;
    const { page, limit, sort } = req.query;
    console.log(sort);
    const paginatedComments = await pg_paginateCommentByRecipeId(
      page,
      limit,
      sort,
      recipeId
    );
    for (const comment of paginatedComments) {
      const isoString = new Date(comment.commentdate).toISOString();
      const [date, time] = isoString.split('T');
      comment.commentdate = `${date} ${time.split('.')[0]}`;
    }
    res.status(200).json(paginatedComments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error });
  }
};
