import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

function RecipeCardNew({ recipeData }) {
  // console.log(recipeData);
  const { categoryId } = useParams();
  return (
    <>
      <Link to={`/category/${categoryId}/${recipeData.recipeId}`}>
        <div className='mx-4 p-3 border border-black rounded-lg'>
          <p>recipe name: {recipeData.name}</p>
          <p>Cuisine: {recipeData.cuisine}</p>
          <p>Category: {recipeData.category}</p>
        </div>
      </Link>
    </>
  );
}

export default RecipeCardNew;
