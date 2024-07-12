import RecipesCards from "./RecipeCards";

function RecipeList({ recipes }) {
    return (
        <div className="recipe-list">
            {recipes.map((recipe) => (
                <RecipesCards key={recipe.id} recipe={recipe} />
            ))}
        </div>
    );
}