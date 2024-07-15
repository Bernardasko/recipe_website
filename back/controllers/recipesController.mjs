import {
  pg_postRecipe,
  pg_deleteRecipeById,
  pg_patchRecipe,
  pg_getAllRecipes,
  pg_getRecipesByUserId,
} from '../models/recipesModel.mjs';

export const postRecipe = async (req, res) => {
  console.log('IMA FROM POST');
  try {
    let { title, ingredients, steps, category, cuisine, image } = req.body;
    console.log(req.body);

    const { id } = req.user;

    ingredients.forEach((obj) => {
      if (obj.ingredient) {
        obj.ingredient = obj.ingredient.toLowerCase();
      }
    });
    steps.forEach((step, index) => {
      steps[index] = step.toLowerCase();
    });
    cuisine = cuisine.toLowerCase();

    //  console.log(title, ingredients, steps, category, cuisine, image, id, 'I AM FROM RECIPES CONTROLLER BEFORE ' );

    const newRecipe = await pg_postRecipe(
      title,
      ingredients,
      steps,
      category.toLowerCase(),
      cuisine,
      image,
      id
    );
    console.log(newRecipe);
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
    let { title, ingredients, steps, category, cuisine, image } = req.body;
    console.log(title, ingredients, steps, category, cuisine, image, 'im image' );
    steps.forEach((step, index) => {
      steps[index] = step.toLowerCase();
    });
    ingredients.forEach((obj) => {
      if (obj.ingredient) {
        obj.ingredient = obj.ingredient.toLowerCase();
      }
    });
    cuisine = cuisine.toLowerCase();
    
    // console.log(recipeId, title, ingredients, steps, category, cuisine, image);
    const patchedRecipe = await pg_patchRecipe(
      recipeId,
      title,
      ingredients,
      steps,
      category,
      cuisine,
      image
    );
    res.status(200).json(patchedRecipe);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error });
  }
};

export const getRecipes = async (req, res) => {
  try {
    const user = req.user;
    console.log(user.role, ' - is user role');

    if (user.role === 'user') {
      console.log(user.id, ' - is user id');
      const recipes = await pg_getRecipesByUserId(user.id);
      console.log(recipes);
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
