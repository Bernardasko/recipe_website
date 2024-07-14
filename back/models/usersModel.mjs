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


 