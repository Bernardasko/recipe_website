import axios from 'axios';

export const deleteCategoryById = async (categoryId) => {
  const delete_cat_url = import.meta.env.VITE_DELETE_CAT;
  const token = window.localStorage.getItem('token');
  try {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const deletedCat = await axios.delete(
      `${delete_cat_url}/${categoryId}`,
      config
    );
    return deletedCat;
  } catch (error) {
    console.error(error);
    return error;
  }
};

export const deleteRecipyById = async (recipeId) => {
  const delete_recipe_url = import.meta.env.VITE_DELETE_RECIPE;
  const token = window.localStorage.getItem('token');
  try {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const deletedRecipe = await axios.delete(
      `${delete_recipe_url}/${recipeId}`,
      config
    );
    return deletedRecipe.status;
  } catch (error) {
    console.error(error);
    return error;
  }
};
