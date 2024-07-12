import express from 'express';
import cors from 'cors';

import userRouter from './routes/usersRoutes.mjs';
import recipeRouter from './routes/recipeRoutes.mjs';
import categoryRouter from './routes/categorysRoute.mjs';
import cuisineRouter from './routes/cuisinesRoutes.mjs';

const app = express();

app.use(express.json());
app.use(cors());

app.use('/v1/users', userRouter);
app.use('/v1/recipes', recipeRouter);
app.use('/v1/categories', categoryRouter);
app.use('/v1/cuisines', cuisineRouter);

export default app;
