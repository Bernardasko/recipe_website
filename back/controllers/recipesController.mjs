import {
  pg_postRecipe,
  pg_deleteRecipeById,
  pg_patchRecipe,
  pg_getAllRecipes,
  pg_getRecipesByUserId,
  pg_getRecipeByIdWithSocials,
} from '../models/recipesModel.mjs';

export const postRecipe = async (req, res) => {
  try {
    let { title, ingredients, steps, category, cuisine, image } = req.body;
    const { id } = req.user;

    ingredients.forEach((obj) => {
      if (obj.ingredient) {
        obj.ingredient = obj.ingredient.toLowerCase().trim();
        obj.amount = obj.ingredient.toLowerCase().trim();
      }
    });
    steps.forEach((step, index) => {
      steps[index] = step.toLowerCase().trim();
    });
    cuisine = cuisine.toLowerCase().trim();

    const newRecipe = await pg_postRecipe(
      title.trim(),
      ingredients,
      steps,
      category.toLowerCase().trim(),
      cuisine,
      image.trim(),
      id
    );
    res.status(201).json(newRecipe);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error });
  }
};

export const deleteRecipe = async (req, res) => {
  try {
    const id = req.params.id;
    const deletedRecipe = await pg_deleteRecipeById(id);
    res.status(200).json(deletedRecipe);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error });
  }
};

export const patchRecipe = async (req, res) => {
  try {
    const recipeId = req.params.id;
    // console.log(recipeId);
    console.log(1111111111111, req.body);
    let { title, ingredients, steps, category, cuisine, image } = req.body;
    console.log(
      title,
      ingredients,
      steps,
      category,
      cuisine,
      image,
    );
    steps.forEach((step, index) => {
      console.log(step);
      steps[index] = step.toLowerCase().trim();
    });
    ingredients.forEach((obj) => {
      if (obj.ingredient) {
        obj.ingredient = obj.ingredient.toLowerCase().trim();
        obj.amount = obj.ingredient.toLowerCase().trim();
      }
    });
    // cuisine = cuisine.toLowerCase().trim();

    // console.log(recipeId, title, ingredients, steps, category, cuisine, image);
    const patchedRecipe = await pg_patchRecipe(
      recipeId,
      title.trim(),
      ingredients,
      steps,
      category.trim().toLowerCase(),
      cuisine.toLowerCase().trim().toLowerCase(),
      image.trim()
    );
    // console.log(patchedRecipe);

    res.status(200).json(patchedRecipe);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error });
  }
};

export const getRecipes = async (req, res) => {
  try {
    const user = req.user;
    if (user.role === 'user') {
      console.log(user.id, ' - is user id');
      const recipes = await pg_getRecipesByUserId(user.id);

      res.status(200).json(recipes);
    } else {
      const recipes = await pg_getAllRecipes();
      console.log(recipes);
      res.status(200).json(recipes);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error });
  }
};

export const getRecipeByIdWithSocials = async (req, res) => {
  try {
    const { id } = req.params;
    const recipe = await pg_getRecipeByIdWithSocials(id);
    res.status(200).json(recipe);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error });
  }
};

export const get_rating_andAboveRecipes = async (req, res) => {
  
}