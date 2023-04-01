import express, { Express, NextFunction, Request, Response } from 'express';

import cors from './config/cors';
require('dotenv').config();
import patients from './routers/patients';
import appointments from './routers/appointments';
import users from './routers/users';
import logger from './system/logger';
import errorHandler from './errors';
import sc from './tools/statusCodes';

const app: Express = express();
const port = process.env.PORT_API;

app.use(express.json());
app.use(cors());

app.get('/api', (req: Request, res: Response) => {
    logger.get(req.originalUrl, 'REQ');
    res.status(sc.OK).json('Helix: A System for Patient Management [[API]]');
    logger.get(req.originalUrl, 'OK', 'Return API');
});

app.use('/api/patients', patients);
app.use('/api/appointments', appointments);
app.use('/api/users', users);

app.all('*', (req: Request, res: Response, next: NextFunction) => {
    logger.get(req.originalUrl, 'REQ');
    res.status(sc.NOT_FOUND).json({ error: 'Not found' });
    logger.get(req.originalUrl, 'ERR', 'Not found');
});

app.use(errorHandler);

app.listen(port, () => {
    logger.info(`Server listening on port ${port}`);
});
