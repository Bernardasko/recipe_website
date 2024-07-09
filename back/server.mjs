import app from './app.mjs';
import sql from './postgres.mjs';
import dotenv from 'dotenv';

dotenv.config();

const port = process.env.PORT || 3001;
(async () => {
  try {
    await sql`SELECT 1+1 as result`;
    console.log('Successfully connected');
  } catch (error) {
    console.log('Error while connecting to database:');
  }
})();

app.listen(port, (error) => {
  if (error) {
    return console.log(`Error occured: ${error.message}`);
  }
  console.log(`Server started and listening requests on port ${port}`);
});
