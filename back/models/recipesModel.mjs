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
      const stepArray = [];
      for (let i = 0; i < steps.length; i++) {
        const step = await sql`
          INSERT INTO recipe_steps (recipeid, stepnumber, description)
          VALUES (${recipeId}, ${i + 1}, ${steps[i]})
          RETURNING stepnumber, description
        `;
        stepArray.push(step[0]);
      }

      // Insert images if provided
      if (image) {
        await sql`
            INSERT INTO images (recipeid, imageurl)
            VALUES (${recipeId}, ${image})
          `;
      }

      return {
        ...recipe[0],
        steps: stepArray,
      };
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

      // Get category ID
      const categoryResult = await sql`
        SELECT categoryid FROM categories WHERE name = ${category}
      `;
      if (categoryResult.length === 0) {
        throw new Error(`Category ${category} does not exist.`);
      }
      const categoryId = categoryResult[0].categoryid;

      // Get cuisine ID
      const cuisineResult = await sql`
        SELECT cuisineid FROM cuisines WHERE name = ${cuisine}
      `;
      if (cuisineResult.length === 0) {
        throw new Error(`Cuisine ${cuisine} does not exist.`);
      }
      const cuisineId = cuisineResult[0].cuisineid;

      // Update the recipe title, category, and cuisine
      await sql`
        UPDATE recipes
        SET title = ${title},
            categoryid = ${categoryId},
            cuisineid = ${cuisineId}
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

      // Insert new image if provided
      if (image) {
        await sql`
          INSERT INTO images (recipeid, imageurl)
          VALUES (${recipeId}, ${image})
        `;
      }

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
        images: row.image_url || null, // Initialize as null
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
    if (!recipes[row.recipeid].steps.includes(row.step_description)) {
      recipes[row.recipeid].steps.push(row.step_description);
    }

    // Update image if it exists
    if (row.image_url) {
      recipes[row.recipeid].images = row.image_url;
    }
  });

  // Convert recipes object to an array
  return Object.values(recipes);
};

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
    if (!recipes[row.recipeid].steps.includes(row.step_description)) {
      recipes[row.recipeid].steps.push(row.step_description);
    }

    // Update image if it exists
    if (row.image_url) {
      recipes[row.recipeid].images = row.image_url;
    }
  });

  // Convert recipes object to an array
  return Object.values(recipes);
};

export const pg_getRecipeByIdWithSocials = async (recipeId) => {
  const flatResults = await sql`
  SELECT 
    r.recipeid AS recipeId,
    r.title AS name,
    u.name AS username,
    u.lastname AS userlastname,
    c.name AS category,
    cu.name AS cuisine,
    i.name AS ingredient,
    ri.amount AS amount,
    rs.stepnumber AS step_number,
    rs.description AS step_description,
    im.imageurl AS image_url,
    com.commentid AS comment_id,
    com.comment AS comment_text,
    com.created_at AS comment_date,
    ucom.name AS commenter_name,
    ucom.lastname AS commenter_lastname,
    rat.ratingid AS rating_id,
    rat.rating AS rating_value,
    urat.name AS rater_name,
    urat.lastname AS rater_lastname,
    GREATEST(
      COALESCE(com.created_at, '1970-01-01'::timestamp), 
      COALESCE(rat.created_at, '1970-01-01'::timestamp)
    ) AS review_date
  FROM recipes r
  INNER JOIN users u ON r.userid = u.id
  INNER JOIN categories c ON r.categoryid = c.categoryid
  INNER JOIN recipe_ingredients ri ON r.recipeid = ri.recipeid
  INNER JOIN ingredients i ON ri.ingredientid = i.ingredientid
  INNER JOIN recipe_steps rs ON r.recipeid = rs.recipeid
  INNER JOIN cuisines cu ON r.cuisineid = cu.cuisineid
  LEFT JOIN images im ON r.recipeid = im.recipeid
  LEFT JOIN comments com ON r.recipeid = com.recipeid
  LEFT JOIN users ucom ON com.userid = ucom.id
  LEFT JOIN ratings rat ON r.recipeid = rat.recipeid
  LEFT JOIN users urat ON rat.userid = urat.id
  WHERE r.recipeid = ${recipeId}
  ORDER BY rs.stepnumber, review_date;
  `;

  const recipe = {
    recipeId: recipeId,
    name: '',
    username: '',
    userlastname: '',
    category: '',
    cuisine: '',
    ingredients: [],
    steps: [],
    images: [],
    social: [],
  };

  flatResults.forEach((row) => {
    // Set basic recipe info
    if (!recipe.name) {
      recipe.name = row.name;
      recipe.username = row.username;
      recipe.userlastname = row.userlastname;
      recipe.category = row.category;
      recipe.cuisine = row.cuisine;
    }

    // Add ingredients
    if (row.ingredient && row.amount) {
      recipe.ingredients.push({
        ingredient: row.ingredient,
        amount: row.amount,
      });
    }

    // Add steps
    if (row.step_number && row.step_description) {
      recipe.steps.push(row.step_description); // Use simple array for steps
    }

    // Add images
    if (row.image_url) {
      recipe.images.push(row.image_url);
    }

    // Add social entries
    if (row.comment_id || row.rating_id) {
      recipe.social.push({
        rating: row.rating_value || null,
        ratingId: row.rating_id || null,
        comment: row.comment_text || null,
        commentId: row.comment_id || null,
        user: {
          name: row.commenter_name || row.rater_name,
          lastname: row.commenter_lastname || row.rater_lastname,
        },
        review_date: row.review_date,
      });
    }
  });

  return recipe;
};

export const pg_get_rating_andAboveRecipes = async (rating) => {
  const recipes = await sql`
  SELECT 
  r.recipeid AS recipeId,
  r.title AS name,
  u.name AS username,
  u.lastname AS userlastname,
  c.name AS category,
  cu.name AS cuisine,
  i.name AS ingredient,
  ri.amount AS amount,
  rs.stepnumber AS step_number,
  rs.description AS step_description,
  im.imageurl AS image_url,
  com.commentid AS comment_id,
  com.comment AS comment_text,
  com.created_at AS comment_date,
  ucom.name AS commenter_name,
  ucom.lastname AS commenter_lastname,
  rat.ratingid AS rating_id,
  rat.rating AS rating_value,
  urat.name AS rater_name,
  urat.lastname AS rater_lastname,
  GREATEST(
    COALESCE(com.created_at, '1970-01-01'::timestamp), 
    COALESCE(rat.created_at, '1970-01-01'::timestamp)
  ) AS review_date
FROM recipes r
INNER JOIN users u ON r.userid = u.id
INNER JOIN categories c ON r.categoryid = c.categoryid
INNER JOIN recipe_ingredients ri ON r.recipeid = ri.recipeid
INNER JOIN ingredients i ON ri.ingredientid = i.ingredientid
INNER JOIN recipe_steps rs ON r.recipeid = rs.recipeid
INNER JOIN cuisines cu ON r.cuisineid = cu.cuisineid
LEFT JOIN images im ON r.recipeid = im.recipeid
LEFT JOIN comments com ON r.recipeid = com.recipeid
LEFT JOIN users ucom ON com.userid = ucom.id
LEFT JOIN ratings rat ON r.recipeid = rat.recipeid
LEFT JOIN users urat ON rat.userid = urat.id
WHERE rat.rating >= ${rating}
ORDER BY rs.stepnumber, review_date;
`;
  return recipes;
};
