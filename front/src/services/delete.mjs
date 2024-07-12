import axios from "axios";

const token = window.localStorage.getItem("token");

const deleteCategory = async (categoryId) => {
  const categories_url = import.meta.env.VITE_CATEGORIES;
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  try {
    const response = await axios.delete(`${categories_url}/${categoryId}`, config);

    if(response.status === 200) {
        return response.data
    }

  } catch (error) {
    console.error(error);
    return error;
  }
};
