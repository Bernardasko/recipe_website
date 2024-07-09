import express from 'express';
import cors from 'cors';

import userRouter from './routes/usersRoutes.mjs';

const app = express();

app.use(express.json());
app.use(cors());

app.use('/v1/users', userRouter);

export default app;
