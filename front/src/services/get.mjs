import axios from 'axios';
const get_app_category = import.meta.env.VITE_CATEGORY
const get_app_cuisine = import.meta.env.VITE_CUISINE;

export const getCategoryById = async (id) => {
  const token = window.localStorage.getItem('token');
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const category = await axios.get(`${get_app_category}/${id}`, config);

  return category.data;
};

export const getCuisineById = async (id) => {
  const get_app_cuisine = import.meta.env.VITE_CUISINES;
  const token = window.localStorage.getItem('token');
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  try {
    const cuisine = await axios.get(`${get_app_cuisine}/${id}`, config);
    return cuisine.data;
  } catch (error) {
    console.error(error);
    return error;
  }
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
    // console.log(categories_url);
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
};

export const getAllRecipes = async () => {
  const getRecipes_url = import.meta.env.VITE_GET_RECIPE;
  console.log(getRecipes_url);
  const token = window.localStorage.getItem('token');
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  try {
    const response = await axios.get(getRecipes_url, config);
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getRecipeByCategoryId = async (id) => {
  const getRecipes_url = import.meta.env.VITE_CATEGORIES;
  // console.log(getRecipes_url+'/'+id);
  const token = window.localStorage.getItem('token');
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  try {
    const response = await axios.get(`${getRecipes_url}/${id}`, config);
    // console.log(response);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getRecipeById = async (id) => {
  const recipe_url = import.meta.env.VITE_GET_RECIPE;
  console.log(recipe_url + '/' + id);
  const token = window.localStorage.getItem('token');
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  try {
    const response = await axios.get(`${recipe_url}/${id}`, config);

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export const getCusinesWithRecipes = async () => {
  const cuisine_with_recipes_url = import.meta.env.VITE_CUISINES_WITHRECIPES;
  const token = window.localStorage.getItem('token');
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  try {
    const response = await axios.get(cuisine_with_recipes_url, config);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getRecipeComments = async (recipeId, queryString) => {
  try {
    const social_url = import.meta.env.VITE_SOCIAL
    const token = window.localStorage.getItem('token');
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const response = await axios.get(`${social_url}/${recipeId}?${queryString}`, config)
    if(response.status ===200){
      return response.data
    } 
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const cuisineSearch = async (cuisine, queryString) => {
  try {
    const cusines_url = import.meta.env.VITE_CUISINES
    console.log(`${cusines_url}/searchCuisine/${cuisine}?${queryString}`);

    const token = window.localStorage.getItem('token');
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const response = await axios.get(`${cusines_url}/searchCusine/${cuisine}?${queryString}`, config)
    if(response.status === 200){
      return response.data
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export const categorySearch = async (category, queryString) => {
  try {
    const category_url = import.meta.env.VITE_CATEGORY
    console.log(`${category_url}/searchCategory/${category}?${queryString}`);
    // console.log(cuisine );
    const token = window.localStorage.getItem('token');
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const response = await axios.get(`${category_url}/searchCategory/${category}?${queryString}`, config)
    if(response.status === 200){
      return response.data
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}
export const getUserAllById = async (id) => {
  const getRecipes_url = import.meta.env.VITE_GET_USER_RECIPE;
  const token = window.localStorage.getItem('token');
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  try {
    const response = await axios.get(`${getRecipes_url}/${id}`, config);
    if (response.status === 200) {
      return response.data;}
    } catch (error){
      console.error(error);
    throw error;
    }}