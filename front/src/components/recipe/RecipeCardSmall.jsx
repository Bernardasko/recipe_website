function RecipeCardSmall({ recipeData }) {
  return (
    <div>
      <div className='mx-4 p-3 border border-black rounded-lg'>
        <h1>Recipe card small</h1>
        <p>recipe name: {recipeData.name}</p>
        <p>Cuisine: {recipeData.cuisine}</p>
        <p>Category: {recipeData.category}</p>
        
      </div>
    </div>
  );
}

export default RecipeCardSmall;
