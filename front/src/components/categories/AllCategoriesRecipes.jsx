import { getRecipeByCategoryId } from '../../services/get.mjs';
import { useEffect, useState } from 'react';
import RecipeCardNew from './RecipeCardNew.jsx';
function AllcategoriesRecipes({ categoryId }) {
  const [recipes, setRecipes] = useState([])

useEffect(() => {
    (async () => {
         setRecipes( await getRecipeByCategoryId(categoryId))
      
    })()
},[])
  return (
    <>
    {recipes.map((recipe, index) => {
        return (<RecipeCardNew key={index} recipeData={recipe}/>)
    })}
    </>
  );
}

export default AllcategoriesRecipes;
