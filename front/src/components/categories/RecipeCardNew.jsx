function RecipeCardNew({recipeData}) {
    console.log(recipeData);
    return ( <>
    <div className="mx-4 p-3 border border-black rounded-lg">
        <p>recipe name: {recipeData.name}</p>
        <p>Cuisine: {recipeData.cuisine}</p>
        <p>Category: {recipeData.category}</p>
    </div>
    </> );
}

export default RecipeCardNew;