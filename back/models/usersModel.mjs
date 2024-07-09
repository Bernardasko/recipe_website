import sql from "../postgres.mjs";

export const pg_getAllUsers = async () => {
  const allUsers = await sql`
  SELECT * FROM users`
  return allUsers
}