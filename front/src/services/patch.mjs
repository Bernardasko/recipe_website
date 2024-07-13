import axios from 'axios';

export const patchRecipeById = async (recipeId) => {
    const patch_recipe_url = import.meta.env.VITE_PATCH_RECIPE;
  const token = window.localStorage.getItem('token');
  console.log(`${patch_recipe_url}/${recipeId}`);
  try {
    const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      const editedRecipe = await axios.patch(`${patch_recipe_url}/${recipeId}`,config)
      console.log(editedRecipe);
      return editedRecipe
  } catch (error) {
    console.error(error);
    return error;
  }
};
