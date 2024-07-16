import { getCuisineById } from "../../services/get.mjs";
import { useEffect, useState } from "react";
import RecipeCardSmall from "../../components/recipe/RecipeCardSmall";

function AllCuisinesRecipes({cuisineId}) {


const [recipes, setRecipes] = useState([]);
useEffect (() => {
  (async ()=>{
    setRecipes(await getCuisineById(cuisineId));
  })();
},[]);
    return ( 

        <>
        {recipes.map((recipe, index) =>{
            return <RecipeCardSmall key={index} recipeData={recipe} />
        })}
        </>
     );
}

export default AllCuisinesRecipes;