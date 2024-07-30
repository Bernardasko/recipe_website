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
  WHERE recipes.cuisineid = ${cuisineId}
  ORDER BY recipes.recipeid, recipe_steps.stepnumber;
  `;

  const recipes = {};

  flatResults.forEach((row) => {
    if (!recipes[row.recipeid]) {
      recipes[row.recipeid] = {
        recipeId: row.recipeid,
        name: row.name,
        image: row.image_url,
        category: row.category,
        cuisine: row.cuisine,
        ingredients: [],
        steps: [],
        ratings: [],
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
    if (row.image_url) {
      recipes[row.recipeid].images = row.image_url;
    }
  });

  

  // Convert recipes object to an array
  return Object.values(recipes);
};

export const pg_getAllcusines = async () => {
  const results = await sql`
  SELECT * FROM cuisines`;
  return results;
};

export const pg_displayAllCusinesWithRecipes = async () => {
  const results = await sql`
    SELECT cuisines.cuisineid AS cuisineid, cuisines.name AS name, ARRAY_AGG(jsonb_build_object('recipeid', recipeid)) as recipeid
    FROM cuisines
    INNER JOIN recipes ON cuisines.cuisineid = recipes.cuisineid
    GROUP BY cuisines.cuisineid
    `;
  return results;
};

export const pg_searchCuisine = async (cuisineName, reqQuery) => {
  let { search, sort, page, limit, order } = reqQuery;
  console.log(order);

  console.log('categories.name');
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
WHERE cuisines.name = ${cuisineName}
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
};

// -- Aggregating ingredients into a JSON array
// ARRAY_AGG(jsonb_build_object('amount', di.amount, 'ingredient', di.ingredient)) AS ingredients,
// -- Aggregating steps into a JSON array
// ARRAY_AGG(ds.description ORDER BY ds.stepnumber) AS steps,
// -- Aggregating comments and ratings into a single JSON object
// jsonb_build_object(
//   'comments', (SELECT JSONB_AGG(jsonb_build_object('comment_id', dc.commentid, 'comment_text', dc.comment, 'comment_date', dc.created_at, 'commenter_name', dc.commenter_name, 'commenter_lastname', dc.commenter_lastname)) FROM distinct_comments dc),
//   'ratings', (SELECT JSONB_AGG(jsonb_build_object('rating_id', dr.ratingid, 'rating_value', dr.rating, 'rater_name', dr.rater_name, 'rater_lastname', dr.rater_lastname, 'review_date', GREATEST(COALESCE(dr.created_at, '1970-01-01'::timestamp), COALESCE(dr.created_at, '1970-01-01'::timestamp)))) FROM distinct_ratings dr)
// ) AS social
