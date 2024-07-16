import { useParams, useLoaderData, Link } from 'react-router-dom';
import RecipeCardSmall from '../../components/recipe/RecipeCardSmall';
function Category() {
  const { categoryId } = useParams();
  const data = useLoaderData();
  console.log(data);
  return (
    <>
      <h1 className='text-4xl text-center'>{data[0].category}</h1>
      {data.map((recipe, index) => {
        return (
          <div>
            <Link
              key={index}
              to={`/category/${recipe.category}/recipe/${recipe.recipeId}`}
            >
              <RecipeCardSmall recipeData={recipe} />
            </Link>
          </div>
        );
      })}
    </>
  );
}

export default Category;
