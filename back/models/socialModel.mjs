import sql from "../postgres.mjs";

export const pg_addComment = async (recipeId, userId, comment) => {
    try {
      const result = await sql`
        INSERT INTO comments (recipeid, userid, comment)
        VALUES (${recipeId}, ${userId}, ${comment})
        RETURNING *
      `;
      return result;
    } catch (error) {
      console.error('Error adding comment:', error);
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
  