import sql from '../postgres.mjs';

export const pg_postRecipe = async (
  title,
  ingredients,
  steps,
  category,
  cuisine,
  image,
  userId
) => {
  // console.log();
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

        // Check if the (recipeid, ingredientid) pair already exists
        const existingRecipeIngredient = await sql`
          SELECT 1 FROM recipe_ingredients WHERE recipeid = ${recipeId} AND ingredientid = ${ingredientId}
        `;

        if (existingRecipeIngredient.length === 0) {
          // Link the ingredient to the recipe with the amount
          await sql`
            INSERT INTO recipe_ingredients (recipeid, ingredientid, amount)
            VALUES (${recipeId}, ${ingredientId}, ${ingredient.amount})
          `;
        }
      }

      // Insert steps
      for (let i = 0; i < steps.length; i++) {
        await sql`
          INSERT INTO recipe_steps (recipeid, stepnumber, description)
          VALUES (${recipeId}, ${i + 1}, ${steps[i]})
        `;
      }

      // Insert images if provided
      if (image) {
        await sql`
            INSERT INTO images (recipeid, imageurl)
            VALUES (${recipeId}, ${image})
          `;
      }
      return recipe[0];
    });

    return recipe;
  } catch (error) {
    console.error('Error adding recipe:', error);
    throw error; // Re-throw the error to handle it outside
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
  image
) => {
  try {
    const patchedRecipe = await sql.begin(async (sql) => {
      // Ensure the recipe exists before making updates
      const recipeExists = await sql`
        SELECT 1 FROM recipes WHERE recipeid = ${recipeId}
      `;

      if (recipeExists.length === 0) {
        throw new Error(`Recipe with ID ${recipeId} does not exist.`);
      }

      // Update the recipe title, category, and cuisine
      await sql`
        UPDATE recipes
        SET title = ${title},
            categoryid = (SELECT categoryid FROM categories WHERE name = ${category.toLowerCase()}),
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

      await sql`
        INSERT into images (recipeid, imageurl)
        VALUES (${recipeId}, ${image})
        `

      return { message: 'Recipe updated successfully' };
    });

    return patchedRecipe;
  } catch (error) {
    console.error('Error updating recipe:', error);
    throw error;
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
    recipe_steps.description AS step_description,
    images.imageurl AS image_url
  FROM recipes
  INNER JOIN users ON recipes.userid = users.id
  INNER JOIN categories ON recipes.categoryid = categories.categoryid
  INNER JOIN recipe_ingredients ON recipes.recipeid = recipe_ingredients.recipeid
  INNER JOIN ingredients ON recipe_ingredients.ingredientid = ingredients.ingredientid
  INNER JOIN recipe_steps ON recipes.recipeid = recipe_steps.recipeid
  INNER JOIN cuisines ON recipes.cuisineid = cuisines.cuisineid
  LEFT JOIN images ON recipes.recipeid = images.recipeid
  WHERE recipes.userid = ${userId}
  ORDER BY recipes.recipeid, recipe_steps.stepnumber;
`;

  const recipes = {};

  flatResults.forEach((row) => {
    if (!recipes[row.recipeid]) {
      recipes[row.recipeid] = {
        recipeId: row.recipeid,
        name: row.name,
        username: row.username,
        userlastname: row.userlastname,
        category: row.category,
        cuisine: row.cuisine,
        ingredients: [],
        steps: [],
        images: null, // Initialize as null
      };
    }

    // Add ingredient
    recipes[row.recipeid].ingredients.push({
      ingredient: row.ingredient,
      amount: row.amount,
    });

    // Add step
    recipes[row.recipeid].steps.push({
      step_number: row.step_number,
      description: row.step_description,
    });

    // Add image if exists and not already set
    if (row.image_url && !recipes[row.recipeid].images) {
      recipes[row.recipeid].images = row.image_url;
    }
  });

  // Convert recipes object to an array
  return Object.values(recipes);
};

export const pg_getAllRecipes = async () => {
  console.log('im in effect');
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
    recipe_steps.description AS step_description,
    images.imageurl AS image_url
  FROM recipes
  INNER JOIN users ON recipes.userid = users.id
  INNER JOIN categories ON recipes.categoryid = categories.categoryid
  INNER JOIN recipe_ingredients ON recipes.recipeid = recipe_ingredients.recipeid
  INNER JOIN ingredients ON recipe_ingredients.ingredientid = ingredients.ingredientid
  INNER JOIN recipe_steps ON recipes.recipeid = recipe_steps.recipeid
  INNER JOIN cuisines ON recipes.cuisineid = cuisines.cuisineid
  LEFT JOIN images ON recipes.recipeid = images.recipeid
  ORDER BY recipes.recipeid, recipe_steps.stepnumber;
`;

  const recipes = {};

  flatResults.forEach((row) => {
    if (!recipes[row.recipeid]) {
      recipes[row.recipeid] = {
        recipeId: row.recipeid,
        name: row.name,
        username: row.username,
        userlastname: row.userlastname,
        category: row.category,
        cuisine: row.cuisine,
        ingredients: [],
        steps: [],
        images: row.image_url || null, // Use a single string for the image URL
      };
    }

    // Add ingredient if it does not already exist
    if (
      !recipes[row.recipeid].ingredients.some(
        (ing) => ing.ingredient === row.ingredient
      )
    ) {
      recipes[row.recipeid].ingredients.push({
        ingredient: row.ingredient,
        amount: row.amount,
      });
    }

    // Add step if it does not already exist
    if (
      !recipes[row.recipeid].steps.some(
        (step) => step.step_number === row.step_number
      )
    ) {
      recipes[row.recipeid].steps.push({
        step_number: row.step_number,
        description: row.step_description,
      });
    }

    // Update image if it exists
    if (row.image_url) {
      recipes[row.recipeid].images = row.image_url;
    }
  });

  // Convert recipes object to an array
  return Object.values(recipes);
};
