import postgres from 'postgres';

const sql = postgres({
  host: 'localhost', // Postgres server
  port: 5432, // Postgres server port
  database: 'recipe', // Database name
  username: 'postgres', // Database username
  password: '', // Database password
});

export default sql;