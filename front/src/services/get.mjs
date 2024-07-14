import axios from 'axios';
const get_app_category = import.meta.env.VITE_CATEGORY_BY_ID;
const get_app_cuisine = import.meta.env.VITE_CUISINE_BY_ID;

export const getCategoryById = async (id) => {
  const token = window.localStorage.getItem('token');
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const category = await axios.get(`${get_app_category}${id}`, config);
  console.log(`${get_app_category}${id}`);

  return category.data;
};

export const getCuisineById = async (id) => {
  const token = window.localStorage.getItem('token');
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const cuisine = await axios.get(`${get_app_cuisine}/${id}`, config);
  return cuisine.data;
};

export const getAllCuisines = async () => {
  const cuisines_url = import.meta.env.VITE_CUISINES;
  const token = window.localStorage.getItem('token');
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  try {
    const response = await axios.get(cuisines_url, config);
    if (response.status === 200) {
      return response;
    }
  } catch (error) {
    console.error(error);
    return error;
  }
};

export const getAllCategories = async () => {
  const categories_url = import.meta.env.VITE_CATEGORIES;
  const token = window.localStorage.getItem('token');
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  try {
    const response = await axios.get(categories_url, config);
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getAllRecipesProfile = async () => {
  const getRecipes_url = import.meta.env.VITE_GET_RECIPE;
  console.log(getRecipes_url);
  const token = window.localStorage.getItem('token');
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  try {
    const response = await axios.get(getRecipes_url, config);
    if (response.status === 200) {
      console.log(response.data);
      return response.data;
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}