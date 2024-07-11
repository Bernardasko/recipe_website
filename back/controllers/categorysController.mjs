import express from 'express';
import { pg_getRecipesByCategoryId } from '../models/categorysModel.mjs';

export const getRecipesByCategoryId = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const results = await pg_getRecipesByCategoryId(categoryId);
    res.status(200).json(results);
  } catch (error) {
    console.log(error);
  }
};


