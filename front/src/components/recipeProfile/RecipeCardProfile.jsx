import { deleteRecipyById } from '../../services/delete.mjs';
import { patchRecipeById } from '../../services/patch.mjs';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import ResponsiveModal from './MuiModal.jsx';
import { useState } from 'react';


const getDefaultImage = (category) => {
  switch (category) {
    case "appetiser":
      return "/appetizer.jpg";
    case "dessert":
      return "/dessert.jpg";
    case "drinks":
      return "/drinks.jpg";
    case "main dish":
      return "/main_dish.jpg";
    // default:
    //   return "/default.jpg"; // default įvaizdis
  }
};

 
function RecipeCardProfile({ data }) {
  // console.log(`check`, data);
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
      <div className='max-w-sm rounded overflow-hidden shadow-lg mb-4' style={{ width: '350px', height: '480px' }}>
  <img
    className='rounded w-full'
    src={data.images || getDefaultImage(data.category)}
    alt={data.images}
    style={{ height: '230px', objectFit: 'cover', objectPosition: 'center', width: '100%',  }} 
  />
  <div className='card-body' style={{ height: '250px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
    <div>
      <h2 className='card-title break-all'>Name: {data.name}</h2>
      <h2 className='card-title'>Cusine: {data.cuisine}</h2>
      <p>Category: {data.category}</p>
    </div>
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
</div>

 
      <Toaster />
    </>
  );
}
 
export default RecipeCardProfile;