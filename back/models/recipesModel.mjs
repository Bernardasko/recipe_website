import sql from '../postgres.mjs';

export const pg_postRecipe = async (
  title,
  ingredients,
  steps,
  category,
  cuisine,
  images,
  userId
) => {
  console.log(category);
  try {
    const recipe = await sql.begin(async (sql) => {
      // Insert the recipe and get the RecipeID
      const recipe = await sql`
        INSERT INTO recipes (title, categoryid, cuisineid, userid)
        VALUES (
          ${title},
          (SELECT categoryid FROM categories WHERE name = ${category}),
          (SELECT cuisineid FROM cuisines WHERE name = ${cuisine}),
          ${userId}
        )
        RETURNING *
      `;
      const recipeId = recipe[0].recipeid;

      // Insert ingredients
      for (const ingredient of ingredients) {
        // Check if the ingredient already exists
        let existingIngredient = await sql`
          SELECT ingredientid FROM ingredients WHERE name = ${ingredient.ingredient}
        `;

        if (existingIngredient.length === 0) {
          // Insert the new ingredient
          existingIngredient = await sql`
            INSERT INTO ingredients (name)
            VALUES (${ingredient.ingredient})
            RETURNING ingredientid
          `;
        }

        const ingredientId = existingIngredient[0].ingredientid;

        // Link the ingredient to the recipe with the amount
        await sql`
          INSERT INTO recipe_ingredients (recipeid, ingredientid, amount)
          VALUES (${recipeId}, ${ingredientId}, ${ingredient.amount})
        `;
      }

      // Insert steps
      for (let i = 0; i < steps.length; i++) {
        await sql`
          INSERT INTO recipe_steps (recipeid, stepnumber, description)
          VALUES (${recipeId}, ${i + 1}, ${steps[i]})
        `;
      }

      // Insert images if provided
      if (images) {
        for (const imageUrl of images) {
          await sql`
            INSERT INTO images (recipeid, imageurl)
            VALUES (${recipeId}, ${imageUrl})
          `;
        }
      }
      return recipe[0];
    });

    return recipe;
  } catch (error) {
    console.error('Error adding recipe:', error);
  }
};

export const pg_deleteRecipeById = async (recipeId) => {
  const deletedRecipe = await sql`
  DELETE FROM recipes
  WHERE recipes.recipeid = ${recipeId}`;
  return deletedRecipe;
};

export const pg_patchRecipe = async (
  recipeId,
  title,
  ingredients,
  steps,
  category,
  cuisine,
  images
) => {
  try {
    const patchedRecipe = await sql.begin(async (sql) => {
      // Update the recipe title, category, and cuisine
      const result = await sql`
          UPDATE recipes
          SET title = ${title},
              categoryid = (SELECT categoryid FROM categories WHERE name = ${category}),
              cuisineid = (SELECT cuisineid FROM cuisines WHERE name = ${cuisine})
          WHERE recipeid = ${recipeId}
        `;

      // Delete existing recipe ingredients
      await sql`
          DELETE FROM recipe_ingredients
          WHERE recipeid = ${recipeId}
        `;

      // Insert updated ingredients
      for (const ingredient of ingredients) {
        let existingIngredient = await sql`
            SELECT ingredientid FROM ingredients WHERE name = ${ingredient.ingredient}
          `;

        if (existingIngredient.length === 0) {
          existingIngredient = await sql`
              INSERT INTO ingredients (name)
              VALUES (${ingredient.ingredient})
              RETURNING ingredientid
            `;
        }

        const ingredientId = existingIngredient[0].ingredientid;

        // Link the ingredient to the recipe with the amount
        await sql`
            INSERT INTO recipe_ingredients (recipeid, ingredientid, amount)
            VALUES (${recipeId}, ${ingredientId}, ${ingredient.amount})
          `;
      }

      // Delete existing recipe steps
      await sql`
          DELETE FROM recipe_steps
          WHERE recipeid = ${recipeId}
        `;

      // Insert updated steps
      for (let i = 0; i < steps.length; i++) {
        await sql`
            INSERT INTO recipe_steps (recipeid, stepnumber, description)
            VALUES (${recipeId}, ${i + 1}, ${steps[i]})
          `;
      }

      // Delete existing images
      await sql`
          DELETE FROM images
          WHERE recipeid = ${recipeId}
        `;

      // Insert updated images if provided
      if (images) {
        for (const imageUrl of images) {
          await sql`
              INSERT INTO images (recipeid, imageurl)
              VALUES (${recipeId}, ${imageUrl})
            `;
        }
      }
      return result[0];
    });
    return patchedRecipe;
  } catch (error) {
    console.error('Error updating recipe:', error);
  }
};

export const pg_getRecipesByUserId = async (userId) => {
  const flatResults = await sql`
  SELECT 
    recipes.recipeid AS recipeId,
    recipes.title AS name,
    users.name AS username,
    users.lastname AS userlastname,
    categories.name AS category,
    cuisines.name AS cuisine,
    ingredients.name AS ingredient,
    recipe_ingredients.amount AS amount,
    recipe_steps.stepnumber AS step_number,
    recipe_steps.description AS step_description
  FROM recipes
  INNER JOIN users ON recipes.userid = users.id
  INNER JOIN categories ON recipes.categoryid = categories.categoryid
  INNER JOIN recipe_ingredients ON recipes.recipeid = recipe_ingredients.recipeid
  INNER JOIN ingredients ON recipe_ingredients.ingredientid = ingredients.ingredientid
  INNER JOIN recipe_steps ON recipes.recipeid = recipe_steps.recipeid
  INNER JOIN cuisines ON recipes.cuisineid = cuisines.cuisineid
  WHERE recipes.userid = ${userId}
  ORDER BY recipes.recipeid, recipe_steps.stepnumber;
`;

  const recipes = {};

  flatResults.forEach(row => {
    if (!recipes[row.recipeid]) {
      recipes[row.recipeid] = {
        recipeId: row.recipeid,
        name: row.name,
        username: row.username,
        userlastname: row.userlastname,
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
}


export const pg_getAllRecipes = async () => {
  const flatResults = await sql`
  SELECT 
    recipes.recipeid AS recipeId,
    recipes.title AS name,
    users.name AS username,
    users.lastname AS userlastname,
    categories.name AS category,
    cuisines.name AS cuisine,
    ingredients.name AS ingredient,
    recipe_ingredients.amount AS amount,
    recipe_steps.stepnumber AS step_number,
    recipe_steps.description AS step_description
  FROM recipes
  INNER JOIN users ON recipes.userid = users.id
  INNER JOIN categories ON recipes.categoryid = categories.categoryid
  INNER JOIN recipe_ingredients ON recipes.recipeid = recipe_ingredients.recipeid
  INNER JOIN ingredients ON recipe_ingredients.ingredientid = ingredients.ingredientid
  INNER JOIN recipe_steps ON recipes.recipeid = recipe_steps.recipeid
  INNER JOIN cuisines ON recipes.cuisineid = cuisines.cuisineid
  ORDER BY recipes.recipeid, recipe_steps.stepnumber;
`;

const recipes = {};

flatResults.forEach(row => {
  if (!recipes[row.recipeid]) {
    recipes[row.recipeid] = {
      recipeId: row.recipeid,
      name: row.name,
      username: row.username,
      userlastname: row.userlastname,
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

}