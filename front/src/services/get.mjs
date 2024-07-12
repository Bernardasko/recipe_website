import axios from 'axios';

const token = window.localStorage.getItem('token');

export const getAllCuisines = async () => {
  const cuisines_url = import.meta.env.VITE_CUISINES;
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
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  try {
    const response = await axios.get(categories_url, config);
    if (response.status === 200) {
      return response;
    }
  } catch (error) {
    console.error(error);
    return error;
  }
};