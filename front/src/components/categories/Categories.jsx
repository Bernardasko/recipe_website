import { useLoaderData } from 'react-router-dom';
import AllcategoriesRecipes from './AllCategoriesRecipes.jsx';
import { Link } from 'react-router-dom';

function Categories() {
  const data = useLoaderData();
  console.log(data);
  const navigateToCategory = (id) => {};
  return (
    <>
      <h1 className='text-4xl text-center'>All CATEGORIES</h1>
      {data.map((category, index) => {
        return (
          <div key={index} className='border border-black p-2 m-2'>



            <Link to={`/category/${category.categoryid}`}>
              <p>{category.name}</p>
            </Link>


            <AllcategoriesRecipes categoryId={category.categoryid} />
          </div>

        );
      })}
    </>
  );
}

export default Categories;
