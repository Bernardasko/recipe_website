import { getCuisineById } from "../../services/get.mjs";
import { useEffect, useState } from "react";
import RecipeCardSmall from "../../components/recipe/RecipeCardSmall";
import { Link } from "react-router-dom";

function AllCuisinesRecipes({ cuisineId }) {
  const [recipes, setRecipes] = useState([]);
  useEffect(() => {
    (async () => {
      setRecipes(await getCuisineById(cuisineId));
    })();
  }, []);
  return (
    <>
      {recipes.map((recipe, index) => {
        return (
          <Link to={`/recipe/${recipe.recipeId}`} key={index}>
            <RecipeCardSmall  recipeData={recipe} />
          </Link>
        );
      })}
    </>
  );
}

export default AllCuisinesRecipes;
