import express from 'express';
import env from 'dotenv';
import DB_Init from './entities/DB_Init.js';
import createDBRouter from './routes/createDbRouter.js';
import attendanceRouter from './routes/attendanceRouter.js';
import eventRouter from './routes/eventRouter.js';

env.config();

let app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

DB_Init();

app.use('/api', createDBRouter);
app.use('/api', attendanceRouter);
app.use('/api', eventRouter);

let port = process.env.PORT || 3000;
app.listen(port);
console.log(`Server running on port ${port}`);