import {
  pg_postRecipe,
  pg_deleteRecipeById,
  pg_patchRecipe,
  pg_getAllRecipes,
  pg_getRecipesByUserId,
  pg_getRecipeByIdWithSocials,
  pg_getAllRecipesData
} from '../models/recipesModel.mjs';

export const postRecipe = async (req, res) => {
  try {
    let { title, ingredients, steps, category, cuisine, image } = req.body;
    const { id } = req.user;

    if (!title || typeof title !== 'string' || !title.trim()) {
      return res.status(400).json({ message: 'Title is required' });
    }
    if (!Array.isArray(ingredients) || ingredients.length === 0) {
      return res.status(400).json({ message: 'Ingredients are required' });
    }
    if (!Array.isArray(steps) || steps.length === 0) {
      return res.status(400).json({ message: 'Steps are required' });
    }
    if (!category || typeof category !== 'string' || !category.trim()) {
      return res.status(400).json({ message: 'Category is required' });
    }
    if (!cuisine || typeof cuisine !== 'string' || !cuisine.trim()) {
      return res.status(400).json({ message: 'Cuisine is required' });
    }


    ingredients.forEach((obj) => {
      if (obj.ingredient) {
        obj.ingredient = obj.ingredient.toLowerCase().trim();
        obj.amount = obj.amount.toLowerCase().trim();
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
      image,
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
    console.log(title, ingredients, steps, category, cuisine, image);
    steps.forEach((step, index) => {
      console.log(step);
      steps[index] = step.toLowerCase().trim();
    });
    ingredients.forEach((obj) => {
      if (obj.ingredient) {
        obj.ingredient = obj.ingredient.toLowerCase().trim();
        obj.amount = obj.amount.toLowerCase().trim();
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
      image//.trim()
    );
    console.log(patchedRecipe, 123, 123, 123);

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

export const getRecipesData = async (req, res) =>{
  try {
    const getData = await pg_getAllRecipesData();
    res.status(200).json({
      // results: searchData.length,
      data: getData,
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
}

export const getRecipesByUserId = async (req, res) => {
  try {
    const { id } = req.params;
    const userRecipes = await pg_getRecipesByUserId(id);

    if (userRecipes.length < 1) {
      return res.status(404).json({ message: 'No recipes found' });
    }
    res.status(200).json(userRecipes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error });
  }
};

export const getRecipeByIdWithSocials = async (req, res) => {
  try {
    const { id } = req.params;
    const recipe = await pg_getRecipeByIdWithSocials(id);

    // console.log(recipe.social.ratings.length);
    console.log(recipe, 1234567);
    if (!recipe) {
      return res.status(404).json({ message: 'Recipe by id not found' });
    }

    if (recipe.social.ratings) {
      const avgRating =
        recipe.social.ratings.reduce(
          (acc, rating) => acc + rating.rating_value,
          0
        ) / recipe.social.ratings.length;
      recipe.average_rating = avgRating;
    }
    if (recipe.social.comments) {
      recipe.social.comments.map((comment, index) => {
        comment.comment_date =
          comment.comment_date.split('T')[0] +
          ' ' +
          comment.comment_date.split('T')[1].split('.')[0];
      });
    }
    res.status(200).json(recipe);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error });
  }
};

export const get_rating_andAboveRecipes = async (req, res) => {};
