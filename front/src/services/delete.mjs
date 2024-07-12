import axios from 'axios'
const token = window.localStorage.getItem('token')

const delete_cat_url = import.meta.env.VITE_DELETE_CAT

export const deleteCategoryById = async (categoryId) => {
 try {
    console.log(delete_cat_url+'/'+categoryId);
    const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
console.log(categoryId);
    const deletedCat = await axios.delete(`${delete_cat_url}/${categoryId}`, config);
    console.log(deletedCat);
    return deletedCat;
 } catch (error) {
    console.error(error);
    return error;
 } 
}
