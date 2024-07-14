import { deleteRecipyById } from '../../services/delete.mjs';
import { patchRecipeById } from '../../services/patch.mjs';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import ResponsiveModal from './MuiModal.jsx';
function RecipeCardProfile({ data }) {
  const navigate = useNavigate();
  const deleteRecipe = async (recipeId) => {
    
    
    
    console.log(data.name);



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
            src={data.image}
            alt={data.image}
          />
        </figure>
        <div className='card-body'>
          <h2 className='card-title'>Name: {data.name}</h2>
          <h2 className='card-title'>Cusine: {data.cuisine}</h2>
          <p>Category: {data.category}</p>
          <div className='flex justify-around my-2'>
            <ResponsiveModal recipeInfo={data} />
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
