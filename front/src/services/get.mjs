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

export const categoryExist = await checkCategoryExists(newCategory.category);
if (categoryExist) {
  setError('Category is already exist');
  return;
}

try {
  const response = await axios.post(
    'http://localhost:3001/v1/category/',
    newCategory
  );
  if (response.status === 200) {
    toast.success('Category created successfully!');
  }

  console.log(response);
  //   reset();
} catch (err) {
  console.log(err);
  setError('An error occurred while submitting the form.');
}