import { useEffect, useState } from "react";
import RecipeCardBig from "./recipe/RecipeCardBig"
import {getAllRecipes} from "../services/get.mjs";//
import RecipeCardSmall from "./recipe/RecipeCardSmall";

function TopRatedRecipes() {
const [recipes, setRecipes] = useState ([])

useEffect(() => {
  (async () => {
    try {
        const allRecipes = await getAllRecipes();//getRecipeByIdWithSocials
        setRecipes(allRecipes)
        console.log(allRecipes);
    } catch (error) {
        console.error("Failed to fetch recipes:", error);  
    }
    
    
  })()
}, [])

    const topRatedRecipes = recipes.filter(recipe => recipe.average_rating === 5);
    return ( 

        <>
        <h1>Top Rated Recipes</h1>
        {topRatedRecipes.map((recipe, index) =>(
            // <RecipeCardBig key={index} recipe={recipe}/>
            <RecipeCardSmall  key={index} recipeData={recipe}/>
        ))}
        </>
     );
}

export default TopRatedRecipes;