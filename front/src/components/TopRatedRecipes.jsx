import { useEffect, useState } from "react";
// import RecipeCardBig from "./recipe/RecipeCardBig"
import { getAllRecipesData } from "../services/get.mjs"; //
import RecipeCardSmall from "./recipe/RecipeCardSmall";
import { Typography, Box, Grid} from "@mui/material";


function TopRatedRecipes() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const allRecipes = await getAllRecipesData();
        setRecipes(allRecipes);
        // console.log(allRecipes);
      } catch (error) {
        console.error("Failed to fetch recipes:", error);
      }
    })();
  }, []);

  const topRatedRecipes = recipes.filter(
    (recipe) => recipe.average_rating === 5
  );
  return (
    <>
      <Typography variant="h4" align="center" gutterBottom sx={{ 
          fontSize: '2rem', // atitinka text-3xl
          fontWeight: 'bold', // atitinka font-bold
          marginBottom: '2.5rem', // atitinka mb-10
          marginTop: '2.5rem', // atitinka mt-10
          textAlign: 'center' // atitinka text-center
        }}>
        Top Rated Recipes
      </Typography>
      <Box sx={{ overflowX: 'scroll', whiteSpace: 'nowrap', padding: '10px' }}>
        {topRatedRecipes.map((recipe, index) => (
          <Box key={index} component="span" sx={{ display: 'inline-block', marginRight: '10px' }}>
            <RecipeCardSmall recipeData={recipe} />
          </Box>
        ))}
      </Box>
    </>
  );
}

export default TopRatedRecipes;
