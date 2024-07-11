import express from 'express';
import cors from 'cors';

import userRouter from './routes/usersRoutes.mjs';
import recipeRouter from './routes/recipeRoutes.mjs'

const app = express();

app.use(express.json());
app.use(cors());

app.use('/v1/users', userRouter);
app.use('/v1/recipes', recipeRouter);

export default app;
