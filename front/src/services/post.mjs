import axios from 'axios'
const post_recipe_url = import.meta.env.VITE_POST_RECIPE
const token = window.localStorage.getItem('token')
export const postRecipe = async (formInfo) => {
    try {
    const config = {
      headers: {Authorization: `Bearer ${token}`}
    }
    const response = await axios.post(post_recipe_url, formInfo, config)
        
    return response
    } catch (error) {
        console.error(error);
        return error
    }
}