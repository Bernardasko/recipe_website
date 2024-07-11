import express from 'express';
import { pg_getRecipesByCuisineId } from '../models/cuisinesModels.mjs';

export const getRecipesByCuisineId = async (req, res) => {
  try {
    const { cuisineId } = req.params;
    console.log(cuisineId);
    const results = await pg_getRecipesByCuisineId(cuisineId);
    res.status(200).json(results);
  } catch (error) {
    console.log(error);
  }
};
