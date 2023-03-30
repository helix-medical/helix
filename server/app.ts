import express, { Express, Request, Response } from 'express';

import cors from 'cors';
require('dotenv').config();
import patients from './routers/patients';
import appointments from './routers/appointments';

import logger from './logger';

const app: Express = express();
const port = process.env.PORT_API;

app.use(express.json());
app.use(cors());

app.get('/api', (req: Request, res: Response) => {
    res.json('Helix: A System for Patient Management [[API]]');
});

app.use('/api/patients', patients);
app.use('/api/appointments', appointments);

app.listen(port, () => {
    logger.info(`Server listening on port ${port}`);
});
