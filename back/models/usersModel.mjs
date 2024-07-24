import sql from '../postgres.mjs';

export const pg_getAllUsers = async () => {
  const allUsers = await sql`
  SELECT * FROM users`;
  return allUsers;
};

export const pg_getUserByEmail = async (email) => {
  const user = await sql`
  SELECT * FROM users
  WHERE email = ${email}`;
  return user[0];
};

export const pg_signupUser = async (userData) => {
  const { name, email, lastname, password, role } = userData;
  const newUser = await sql`
  INSERT INTO users (name, lastname, email, password, role)
  VALUES (${name}, ${lastname}, ${email}, ${password}, ${role})
  RETURNING *`;
  return newUser[0];
};

export const pg_addFollower = async (userId, followerId) => {
  try {
    const follower = await sql`
      INSERT INTO followers (user_id, follower_id)
      VALUES (${userId}, ${followerId})
      RETURNING *
    `;
   return follower;
  } catch (error) {
    console.log(error.detail);
    return error.detail;
  }
};
export const pg_removeFollower = async (userId, followerId) => {
  try {
   const removeFollower =  await sql`
      DELETE FROM followers
      WHERE user_id = ${userId} AND follower_id = ${followerId}
      RETURNING *
    `;
    return removeFollower[0]
  } catch (error) {
    console.error('Error removing follower:', error);
    throw error;
  }
};
export const pg_getFollowers = async (userId) => {
  try {
    const followers = await sql`
      SELECT u.id, u.name, u.lastname
      FROM followers f
      INNER JOIN users u ON f.follower_id = u.id
      WHERE f.user_id = ${userId}
    `;
    return followers;
  } catch (error) {
    console.error('Error getting followers:', error);
    throw error;
  }
};

export const pg_isFollowing = async (userId, followerId) => {
  try {
    const result = await sql`
      SELECT EXISTS (
        SELECT 1
        FROM followers
        WHERE user_id = ${userId}
          AND follower_id = ${followerId}
      ) AS is_following;
    `;
    return result[0].is_following;
  } catch (error) {
    console.error('Error checking follow status:', error);
    throw error;
  }
};