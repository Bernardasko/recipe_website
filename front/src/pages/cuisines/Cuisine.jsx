import { useLoaderData } from "react-router-dom";
import RecipeCardSmall from "../../components/recipe/RecipeCardSmall";

function Cuisine() {
  const data = useLoaderData();
  console.log(data);
  return (
    <>
      <h1>Hello I am cuisine!</h1>
      {data.map((recipe, index) => {
        return (
          <div key={index}>
            <RecipeCardSmall recipeData={recipe} />
          </div>
         
        );
      })}
    </>
  );
}

export default Cuisine;
