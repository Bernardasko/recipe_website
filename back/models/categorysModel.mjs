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
    cuisines.name AS cuisine,
    ratings.rating AS rating,
    images.imageurl AS image_url
  FROM recipes
  INNER JOIN categories ON recipes.categoryid = categories.categoryid
  INNER JOIN recipe_ingredients ON recipes.recipeid = recipe_ingredients.recipeid
  INNER JOIN ingredients ON recipe_ingredients.ingredientid = ingredients.ingredientid
  INNER JOIN recipe_steps ON recipes.recipeid = recipe_steps.recipeid
  INNER JOIN cuisines ON recipes.cuisineid = cuisines.cuisineid
  LEFT JOIN images ON recipes.recipeid = images.recipeid
  LEFT JOIN ratings ON recipes.recipeid = ratings.recipeid
  WHERE recipes.categoryid = ${categoryId}
  ORDER BY recipes.recipeid, recipe_steps.stepnumber;
  `;

  const recipes = {};

  flatResults.forEach(row => {
    if (!recipes[row.recipeid]) {
      recipes[row.recipeid] = {
        recipeId: row.recipeid,
        name: row.name,
        image: row.image_url,
        category: row.category,
        cuisine: row.cuisine,
        ingredients: [],
        steps: [],
        ratings: []
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

    // Add the rating if it exists and is not already in the ratings array
    if (row.rating && !recipes[row.recipeid].ratings.includes(row.rating)) {
      recipes[row.recipeid].ratings.push(row.rating);
    }

    if (row.image_url) {
      recipes[row.recipeid].images = row.image_url;
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

export const pg_searchCategory = async (categoryName, reqQuery) => {
  let { search, sort, page, limit, order } = reqQuery;

  console.log('cuisines.name');
  page = parseInt(page);
  limit = parseInt(limit);

  const orderByClause = `ORDER BY ${sort} ${order}`;
  const offset = (page - 1) * limit;
  const searchPattern = `%${search}%`;
  console.log(search);

  console.log(orderByClause);
  const results = await sql`
  SELECT recipes.recipeid,
    recipes.title AS recipe, 
    cuisines.name AS cuisine_name,
    categories.name AS category,
    users.name AS username,
    users.lastname AS userlastname,
    users.id AS userid,
    images.imageurl AS image_url,
    ARRAY_AGG(DISTINCT jsonb_build_object('amount', recipe_ingredients.amount, 'ingredient', ingredients.name )) AS ingredients,
    ARRAY_AGG(recipe_steps.description ORDER BY recipe_steps.stepnumber) AS steps
  FROM cuisines
  INNER JOIN recipes ON recipes.cuisineid = cuisines.cuisineid
  INNER JOIN recipe_ingredients ON recipes.recipeid = recipe_ingredients.recipeid
  INNER JOIN ingredients ON recipe_ingredients.ingredientid = ingredients.ingredientid
  INNER JOIN recipe_steps ON recipes.recipeid = recipe_steps.recipeid
  INNER JOIN users ON recipes.userid = users.id
  INNER JOIN categories ON recipes.categoryid = categories.categoryid
  INNER JOIN images ON images.recipeid = recipes.recipeid
  WHERE categories.name = ${categoryName}
    ${
      search
        ? sql`AND (
      recipes.title ILIKE ${searchPattern}
      OR categories.name ILIKE ${searchPattern}
      OR users.name ILIKE ${searchPattern}
      OR users.lastname ILIKE ${searchPattern}
      OR ingredients.name ILIKE ${searchPattern}
      OR recipe_steps.description ILIKE ${searchPattern}
    )`
        : sql``
    }  
  
  GROUP BY recipes.recipeid, users.id, cuisines.name, users.name, categories.name, images.imageurl, users.lastname
  ${sql.unsafe(orderByClause)}
  LIMIT ${limit}
  OFFSET ${offset};
  `;
    return results;
}