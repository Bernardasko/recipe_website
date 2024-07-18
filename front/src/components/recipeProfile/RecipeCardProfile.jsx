import { deleteRecipyById } from '../../services/delete.mjs';
import { patchRecipeById } from '../../services/patch.mjs';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import ResponsiveModal from './MuiModal.jsx';
import { useState } from 'react';
 
function RecipeCardProfile({ data }) {
  const navigate = useNavigate();
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
 
  const deleteRecipe = async (recipeId) => {
    const result = await deleteRecipyById(recipeId);
    if (result === 200) {
      toast.success(`${data.name} was deleted !`);
      navigate('/profile/recipes');
    } else {
      toast.error(`Error while deleting ${data.name}`);
    }
  };
 
  const handleDeleteClick = () => {
    setShowConfirmDialog(true);
  };
 
  const handleConfirmDelete = () => {
    deleteRecipe(data.recipeId);
    setShowConfirmDialog(false);
  };
 
  const handleCancelDelete = () => {
    setShowConfirmDialog(false);
  };
 
  return (
    <>
      <div className='card w-96 max-w-sm shadow-xl rounded-lg'>
        <figure>
          <img
            className='rounded-tl-lg rounded-tr-lg'
            src={data.images}
            alt={data.images}
           style={{height: '320px', width: '390px', marginBottom: '10px'}}
          />
        </figure>
        <div className='card-body'>
        <h2 className='card-title truncate'>Name: {data.name}</h2>
          <h2 className='card-title'>Cusine: {data.cuisine}</h2>
          <p>Category: {data.category}</p>
          <div className='flex justify-around my-2'>
            <ResponsiveModal recipeInfo={data} />
            <button
              className='btn btn-outline btn-error'
              onClick={handleDeleteClick}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
 
      {showConfirmDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-lg w-1/3 text-center">
            <p>Are you sure you want to delete {data.name}?</p>
            <div className="mt-4 flex justify-center space-x-2">
              <button className="btn btn-outline" onClick={handleCancelDelete}>Cancel</button>
              <button className="btn btn-error" onClick={handleConfirmDelete}>Delete</button>
            </div>
          </div>
        </div>
      )}
 
      <Toaster />
    </>
  );
}
 
export default RecipeCardProfile;