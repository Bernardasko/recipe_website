import sql from "../postgres.mjs";

export const pg_getRecipesByCategoryId = async (categoryId) => {
  const flatResults = await sql`
  SELECT 
    recipes.recipeid AS recipeId,
    recipes.title AS name,
    categories.name AS category,
    ingredients.name AS ingredient,
    recipe_ingredients.amount AS amount,
    recipe_steps.stepnumber AS step_number,
    recipe_steps.description AS step_description,
    cuisines.name AS cuisine
  FROM recipes
  INNER JOIN categories ON recipes.categoryid = categories.categoryid
  INNER JOIN recipe_ingredients ON recipes.recipeid = recipe_ingredients.recipeid
  INNER JOIN ingredients ON recipe_ingredients.ingredientid = ingredients.ingredientid
  INNER JOIN recipe_steps ON recipes.recipeid = recipe_steps.recipeid
  INNER JOIN cuisines ON recipes.cuisineid = cuisines.cuisineid
  WHERE recipes.categoryid = ${categoryId}
  ORDER BY recipes.recipeid, recipe_steps.stepnumber;
  `;

  const recipes = {};

  flatResults.forEach(row => {
    if (!recipes[row.recipeid]) {
      recipes[row.recipeid] = {
        recipeId: row.recipeid,
        name: row.name,
        category: row.category,
        cuisine: row.cuisine,
        ingredients: [],
        steps: []
      };
    }

    // Check if the ingredient already exists
    const existingIngredient = recipes[row.recipeid].ingredients.find(ing => ing.ingredient === row.ingredient);
    if (!existingIngredient) {
      recipes[row.recipeid].ingredients.push({
        ingredient: row.ingredient,
        amount: row.amount
      });
    }

    // Check if the step already exists
    const existingStep = recipes[row.recipeid].steps.find(step => step.step_number === row.step_number && step.description === row.step_description);
    if (!existingStep) {
      recipes[row.recipeid].steps.push({
        step_number: row.step_number,
        description: row.step_description
      });
    }
  });

  // Convert recipes object to an array
  return Object.values(recipes);
};

export const pg_getAllCategories = async () => {
  const results = await sql`
  SELECT * FROM categories`
  return results
}

export const pg_addCategory = async (category) => {
  const result = await sql`
  INSERT INTO categories (name)
  VALUES (${category})
  RETURNING *`
  return result
}

export const pg_deleteCategory = async (categoryId) => {
  const result = await sql`
  DELETE FROM categories
  WHERE categories.categoryid = ${categoryId}
  RETURNING *`
  return result
}
