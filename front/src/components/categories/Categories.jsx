import { useLoaderData } from 'react-router-dom';
import AllcategoriesRecipes from './AllCategoriesRecipes.jsx';

function Categories() {
  const data = useLoaderData();
  console.log(data);
  return (
    <>
      <h1>hello</h1>
      {data.map((category, index) => {
        return (
          <div key={index}>
            <p>{category.name}</p>
            <AllcategoriesRecipes categoryId={category.categoryid} />
          </div>
        );
      })}
    </>
  );
}

export default Categories;
