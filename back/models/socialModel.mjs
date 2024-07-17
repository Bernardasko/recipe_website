import sql from '../postgres.mjs';

export const pg_addReview = async (recipeId, userId, comment, rating) => {
  console.log(typeof rating);
  try {
    const review = await sql.begin(async (sql) => {
      const review = await sql`
        INSERT INTO comments (recipeid, userid, comment)
        VALUES (${recipeId}, ${userId}, ${comment})
        RETURNING *`;
      const commentId = review[0].commentid;
      await sql`
        INSERT INTO ratings (recipeId, userId, rating, commentid)
        VALUES (${recipeId}, ${userId}, ${rating}, ${commentId})
        RETURNING *`;
      return review;
    });

    return review[0];
  } catch (error) {
    console.error('Error adding review:', error);
    throw error;
  }
};

export const pg_getReviewByRecipeId = async (recipeId) => {
  try {
    const reviews = await sql`
    SELECT 
      com.commentid AS commentId,
      com.comment AS commentText,
      com.created_at AS commentDate,
      u.name AS commenterName,
      u.lastname AS commenterLastname,
      rat.rating AS rating
    FROM comments com
    INNER JOIN users u ON com.userid = u.id
    LEFT JOIN ratings rat ON com.commentid = rat.commentid
    WHERE com.recipeid = ${recipeId}
    GROUP BY com.commentid, com.comment, com.created_at, u.name, u.lastname, rat.rating
    ORDER BY com.created_at;
    `;

    return reviews;
  } catch (error) {
    console.error('Error getting review:', error);
    throw error;
  }
};

export const pg_addFollower = async (userId, followsId) => {
  try {
    const result = await sql`
        INSERT INTO followers (userid, followsid)
        VALUES (${userId}, ${followsId})
        RETURNING *
      `;
    return result;
  } catch (error) {
    console.error('Error adding follower:', error);
    throw error;
  }
};
