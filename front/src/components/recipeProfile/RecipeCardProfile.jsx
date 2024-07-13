import { deleteRecipyById } from '../../services/delete.mjs';
import { patchRecipeById } from '../../services/patch.mjs';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import ResponsiveModal from './MuiModal.jsx';
function RecipeCardProfile({ data }) {
  const navigate = useNavigate();

  const editRecipe = async (recipeId) => {
    // const result = await patchRecipeById(recipeId)
    // console.log(result);
  };

  const deleteRecipe = async (recipeId) => {
    console.log(data);
    console.log(recipeId);
    const result = await deleteRecipyById(recipeId);
    if (result === 200) {
      toast.success(`${data.name} was deleted !`);
      navigate('/profile/recipes');
    } else {
      toast.danger(`Error while deleting ${data.name}`);
    }
  };
  return (
    <>
      <div className='card min-w-56 max-w-sm  shadow-xl  rounded-lg'>
        <figure>
          <img
            className='rounded-tl-lg rounded-tr-lg'
            src='https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg'
            alt='Shoes'
          />
        </figure>
        <div className='card-body'>
          <h2 className='card-title'>Name: {data.name}</h2>
          <p>Category: {data.category}</p>
          <div className='flex justify-around my-2'>
            <ResponsiveModal recipeInfo={data}/>
            {/* <button
              className='btn btn-warning'
              onClick={() => editRecipe(data.recipeId)}
            >
              Edit
            </button> */}
            <button
              className='btn btn-outline btn-error'
              onClick={() => deleteRecipe(data.recipeId)}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
      <Toaster />
    </>
  );
}

export default RecipeCardProfile;
