import express from 'express';
import {
  pg_getRecipesByCategoryId,
  pg_getAllCategories,
  pg_addCategory, pg_deleteCategory
} from '../models/categorysModel.mjs';

// const capitalizeEveryWord = (string) => {
//   return string
//     .split(' ')
//     .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
//     .join(' ');
// };

export const getRecipesByCategoryId = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const results = await pg_getRecipesByCategoryId(categoryId);
    res.status(200).json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error });
  }
};

export const getAllCategories = async (req, res) => {
  try {
    const allCategories = await pg_getAllCategories();
    if (allCategories.length === 0)
      return res.status(404).json({ message: 'No categories found' });

    const transformCategoryName = (string) => {
      return string
        .split('_') // Replace underscores with spaces
        .join(' ')
        .split(' ') // Split into words
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize each word
        .join(' '); // Join words back into a single string
    };

    const transformedCategories = allCategories.map((category) => ({
      ...category,
      name: transformCategoryName(category.name),
    }));

    res.status(200).json(transformedCategories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error });
  }
};

export const addCategory = async (req, res) => {
  try {
    const {category} = req.body
    const newCategory = await pg_addCategory(category)
    res.status(201).json(newCategory)
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error });
  }
}

export const deleteCategory = async (req, res) => {
  try {
    const {categoryId} = req.params
    const deletedCategory = await pg_deleteCategory(categoryId)
    res.status(200).json(deletedCategory)
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error });
  }
}