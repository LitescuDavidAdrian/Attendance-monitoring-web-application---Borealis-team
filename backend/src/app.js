import express from 'express';
import cors from 'cors';
import env from 'dotenv';
import DB_Init from './entities/DB_Init.js';
import createDBRouter from './routes/createDbRouter.js';
import attendanceRouter from './routes/attendanceRouter.js';
import eventRouter from './routes/eventRouter.js';
import eventGroupRouter from './routes/eventGroupRouter.js';
import checkinRouter from './routes/checkinRouter.js';
import { startEventScheduler } from './services/eventScheduler.js';

env.config();

let app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

async function startServer() {
    await DB_Init();
    startEventScheduler();

    app.use('/api', createDBRouter);
    app.use('/api', attendanceRouter);
    app.use('/api', eventRouter);
    app.use('/api', eventGroupRouter);
    app.use('/api', checkinRouter);

    let port = process.env.PORT || 3000;
    app.listen(port);
    console.log(`Server running on port ${port}`);
}

startServer();