import { deleteCategoryById } from '../../services/delete.mjs';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, Toaster } from 'react-hot-toast';

function CategoryListProfile({ data }) {
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const navigate = useNavigate();

  const openDeleteConfirmation = (category) => {
    setCategoryToDelete(category);
  };

  const closeDeleteConfirmation = () => {
    setCategoryToDelete(null);
  };

  const deleteCat = async () => {
    if (!categoryToDelete) return;

    try {
      await deleteCategoryById(categoryToDelete.categoryid);
      toast.success(`Category ${categoryToDelete.name} was deleted!`);
      navigate('/profile/categories');
    } catch (error) {
      console.error(error);
      toast.error(`Failed to delete category ${categoryToDelete.name}`);
    } finally {
      setCategoryToDelete(null);
    }
  };

  return (
    <>
      <h1 className='text-center text-2xl font-bold my-4'>Category list</h1>
      <ul className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4'>
        {data.map((item, index) => (
          <li key={index} className='flex flex-col items-center bg-gray-100 p-6 ml-4 mr-8 rounded-lg shadow'>
            <div className='mb-4'>
              <p className='bg-yellow-400 py-2 px-4 text-white rounded-md text-center'>
                {item.name}
              </p >
              <button 
              id='btndelete' 
                className='border bg-slate-500 p-2 rounded-lg'
                onClick={() => openDeleteConfirmation(item)}
              >
                Delete {item.name} category
              </button>
            </div>
          </li>
        ))}
      </ul>

      {categoryToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-lg">
            <p>Are you sure you want to delete the category {categoryToDelete.name}?</p>
            <div className="mt-4 flex justify-center space-x-2">
              <button id='btncancel' className="bg-gray-300 px-4 py-2 rounded" onClick={closeDeleteConfirmation}>Cancel</button>
              <button id='btndelete' className="bg-red-500 text-white px-4 py-2 rounded" onClick={deleteCat}>Delete</button>
            </div>
          </div>
        </div>
      )}

      <Toaster />
    </>
  );
}

export default CategoryListProfile;