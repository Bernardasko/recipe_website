import sql from '../postgres.mjs';

export const pg_getRecipesByCuisineId = async (cuisineId) => {
  const flatResults = await sql`
  SELECT 
    recipes.recipeid AS recipeId,
    recipes.title AS name,
    categories.name AS category,
    ingredients.name AS ingredient,
    recipe_ingredients.amount AS amount,
    recipe_steps.stepnumber AS step_number,
    recipe_steps.description AS step_description,
    cuisines.name AS cuisine,
    ratings.rating AS rating
  FROM recipes
  INNER JOIN categories ON recipes.categoryid = categories.categoryid
  INNER JOIN recipe_ingredients ON recipes.recipeid = recipe_ingredients.recipeid
  INNER JOIN ingredients ON recipe_ingredients.ingredientid = ingredients.ingredientid
  INNER JOIN recipe_steps ON recipes.recipeid = recipe_steps.recipeid
  INNER JOIN cuisines ON recipes.cuisineid = cuisines.cuisineid
  LEFT JOIN ratings ON recipes.recipeid = ratings.recipeid
  WHERE recipes.cuisineid = ${cuisineId}
  ORDER BY recipes.recipeid, recipe_steps.stepnumber;
  `;

  const recipes = {};

  flatResults.forEach((row) => {
    if (!recipes[row.recipeid]) {
      recipes[row.recipeid] = {
        recipeId: row.recipeid,
        name: row.name,
        category: row.category,
        cuisine: row.cuisine,
        ingredients: [],
        steps: [],
        ratings: []
      };
    }

    // Check if the ingredient already exists
    const existingIngredient = recipes[row.recipeid].ingredients.find(
      (ing) => ing.ingredient === row.ingredient
    );
    if (!existingIngredient) {
      recipes[row.recipeid].ingredients.push({
        ingredient: row.ingredient,
        amount: row.amount,
      });
    }

    // Check if the step already exists
    const existingStep = recipes[row.recipeid].steps.find(
      (step) =>
        step.step_number === row.step_number &&
        step.description === row.step_description
    );
    if (!existingStep) {
      recipes[row.recipeid].steps.push({
        step_number: row.step_number,
        description: row.step_description,
      });
    }

    // Add the rating if it exists and is not already in the ratings array
    if (row.rating && !recipes[row.recipeid].ratings.includes(row.rating)) {
      recipes[row.recipeid].ratings.push(row.rating);
    }
  });

  // Convert recipes object to an array
  return Object.values(recipes);
};

export const pg_getAllcusines = async () => {
  const results = await sql`
  SELECT * FROM cuisines`
  return results
}

export const pg_displayAllCusinesWithRecipes = async () => {
    const results = await sql`
    SELECT cuisines.cuisineid AS cuisineid, cuisines.name AS name, ARRAY_AGG(jsonb_build_object('recipeid', recipeid)) as recipeid
    FROM cuisines
    INNER JOIN recipes ON cuisines.cuisineid = recipes.cuisineid
    GROUP BY cuisines.cuisineid
    `
    return results
  }