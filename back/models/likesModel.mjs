import sql from '../postgres.mjs';
export const pg_getLikeCount = async (recipeid) => {
    const result = await sql`
      SELECT COUNT(*) AS count FROM likes WHERE recipeid = ${recipeid};
    `;
    return result[0].count;
  };

  // export const pg_checkIfLiked = async (recipeid, userid) => {
  //   const result = await sql`
  //     SELECT COUNT(*) AS count FROM likes 
  //     WHERE recipeid = ${recipeid} AND userid = ${userid}
  //   `;
  //   return result[0].count > 0;
  // };
  
  export const pg_checkIfLiked = async (recipeid, userid) => {
    console.log(`Checking if recipe ${recipeid} is liked by user ${userid}`);
    try {
      const result = await sql`
        SELECT COUNT(*) AS count 
        FROM likes 
        WHERE recipeid = ${recipeid} AND userid = ${userid}
      `;
      return result[0].count > 0;
    } catch (error) {
      console.error('Error checking like status:', error);
      throw error;
    }
  };
  

export const pg_postLike = async (recipeid, userid)=>{
const postLike = await sql`
INSERT INTO likes(recipeid, userid)
VALUES (${recipeid}, ${userid})
RETURNING *
`
return postLike[0]
}

  export const pg_deleteLike =async (recipeid, userid) =>{
    const result =await sql `
    DELETE FROM likes
    WHERE recipeid = ${recipeid} AND userid = ${userid}
    RETURNING *
    `
    return result

  }