import express from 'express';
import { pg_getRecipesByCategoryId } from '../models/categorysModel.mjs';
import { pg_getCategoryByName, pg_postCategory } from '../models/categorysModel.mjs';

export const getRecipesByCategoryId = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const results = await pg_getRecipesByCategoryId(categoryId);
    res.status(200).json(results);
  } catch (error) {
    console.log(error);
  }
};

export const getCategoryByName =async (req, res) =>{
  try {
    const { name } = req.query;
    const results = await pg_getCategoryByName(name);
    res.status(200).json({ exists: !!results });
  } catch (error) {
    console.log(error);
  }
};

export const postCategory = async (req, res) => {
  try {
    const { name } = req.body; 
    if (!name) {
      return res.status(400).json({ message: "Category name is required" });
    }

    // Check if category exist
    const existingCategory = await pg_getCategoryByName(name);
    if (existingCategory) {
      return res.status(400).json({ message: "Category already exists" });
    }

    // post if category not exist
    const newCategory = await pg_postCategory(name);
    res.status(200).json(newCategory);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

