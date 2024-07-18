import axios from 'axios';

export const patchRecipeById = async (recipeData) => {
  const patch_recipe_url = import.meta.env.VITE_PATCH_RECIPE;
  const token = window.localStorage.getItem('token');
  try {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    console.log('IAM RECIPE DATA FROM PATCH',recipeData);
    const editedRecipe = await axios.patch(
      `${patch_recipe_url}/${recipeData.recipeId}`,
      recipeData,
      config
    );
    return editedRecipe;
  } catch (error) {
    console.error(error);
    return error;
  }
};