import { useLoaderData } from "react-router-dom";
import RecipeCardSmall from "../../components/recipe/RecipeCardSmall";
import { Link } from "react-router-dom";

function Cuisine() {
  const data = useLoaderData();
  console.log(data);
  return (
    <>
      <h1>Hello I am cuisine!</h1>
      {data.map((recipe, index) => {
        return (
          <Link to={`/recipe/${recipe.recipeId}`} key={index}>
            <div>
              <RecipeCardSmall recipeData={recipe} />
            </div>
            View Recipe
          </Link>
        );
      })}
    </>
  );
}

export default Cuisine;
