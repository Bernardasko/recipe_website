import { getRecipeByCategoryId } from '../../services/get.mjs';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import RecipeCardSmall from '../../components/recipe/RecipeCardSmall.jsx';
function AllcategoriesRecipes({ categoryId }) {
  const [recipes, setRecipes] = useState([]);
  useEffect(() => {
    (async () => {
      setRecipes(await getRecipeByCategoryId(categoryId));
    })();
  }, []);
  return (
    <>
      {recipes.map((recipe, index) => {
        return (
          <Link
            key={index}
            to={`/category/${categoryId}/recipe/${recipe.recipeId}`}
          >
            <RecipeCardSmall key={index} recipeData={recipe} />
          </Link>
        );
      })}
    </>
  );
}

export default AllcategoriesRecipes;
