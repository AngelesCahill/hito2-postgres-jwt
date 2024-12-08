import 'dotenv/config';
import express from 'express';
import userRouter from '../src/routes/user.route.js';
import projectRouter from '../src/routes/projects.route.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/users', userRouter);
app.use('/api/v1/projects', projectRouter);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log('Servidor andando en ' + PORT));