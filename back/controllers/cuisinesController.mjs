import express from 'express';
import {
  pg_getRecipesByCuisineId,
  pg_getAllcusines,
  pg_displayAllCusinesWithRecipes,
} from '../models/cuisinesModels.mjs';

export const getRecipesByCuisineId = async (req, res) => {
  try {
    const { cuisineId } = req.params;
    console.log(cuisineId);
    const results = await pg_getRecipesByCuisineId(cuisineId);
    console.log(results);
    if(results.length < 1){
      return res.status(404).json({message: 'No recipes dound by cuisine id'})
    }
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ message: error });
    console.log(error);
  }
};

export const getAllcusines = async (req, res) => {
  try {
    const allCuisines = await pg_getAllcusines();
    if (allCuisines.length === 0)
      return res.status(404).json({ message: 'No cuisines found' });

    const transformCategoryName = (string) => {
      return string
        .split(' ') // Split into words
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize each word
        .join(' '); // Join words back into a single string
    };
    const transformedCuisines = allCuisines.map((category) => ({
      ...category,
      name: transformCategoryName(category.name),
    }));

    res.status(200).json(transformedCuisines);
  } catch (error) {
    res.status(500).json({ message: error });
    console.log(error);
  }
};

export const displayAllCusinesWithRecipes = async (req, res) => {
  try {
    const cusinesWithRecipes = await pg_displayAllCusinesWithRecipes();
    res.status(200).json(cusinesWithRecipes);
  } catch (error) {
    res.status(500).json({ message: error });
    console.log(error);
  }
};
