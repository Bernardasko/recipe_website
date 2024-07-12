import axios from 'axios';

export const postRecipe = async (formInfo) => {
  const post_recipe_url = import.meta.env.VITE_POST_RECIPE;
  const token = window.localStorage.getItem('token');
  try {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const response = await axios.post(post_recipe_url, formInfo, config);
    console.log(config);
    return response;
  } catch (error) {
    console.error(error);
    return error;
  }
};

export const postNewCategory = async (categoryName) => {
  const token = window.localStorage.getItem('token');
  const post_cat_url = import.meta.env.VITE_POST_CAT;
  console.log(post_cat_url);
  try {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    const response = await axios.post(post_cat_url, categoryName, config);

    return response
  } catch (error) {
    console.error(error);
    return error;
  }
};
