import { getAllCategories } from '../../services/get.mjs';
import { deleteCategoryById } from '../../services/delete.mjs';
import { useEffect, useState } from 'react';
function CategoryListProfile({refresh, setRefresh}) {
  const [allCategories, setAllCategories] = useState([]);
  

  const deleteCat = async (categoryid) => {
    try {
      const deletedCategory = await deleteCategoryById(categoryid);
      setRefresh(prev => !prev)
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    (async () => {
      const allCat = await getAllCategories();
      setAllCategories(allCat.data);
    })();
  }, [refresh]);
  return (
    <>
      <h1>cat list</h1>
      <ul>
        {allCategories.map((item, index) => {
          return (
            <li key={index}>
              <div>
                <p className='bg-lime-600 py-2 max-w-max mx-auto'>
                  {item.name}
                </p>
                <button
                  className='border bg-slate-500 p-2 rounded-lg'
                  onClick={()=>deleteCat(item.categoryid)}
                >
                  delete {item.name} category
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default CategoryListProfile;
