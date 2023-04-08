import express, { Express, NextFunction, Request, Response } from 'express';
import cors from './config/cors';
require('dotenv').config();
import patients from './routers/patients';
import appointments from './routers/appointments';
import authORoute from './routers/auth';
import accounting from './routers/accounting';
import users from './routers/users';
import logger from './system/logger';
import errorHandler from './system/errors';
import sc from './tools/statusCodes';
// import auth from './middleware/auth';
import cookieParser from 'cookie-parser';
import credentials from './middleware/credentials';

// Config
const app: Express = express();
const port = process.env.PORT_API || 3001;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(credentials);
app.use(cors());
app.use(cookieParser());

// Main
app.get('/api', (req: Request, res: Response) => {
    logger.get(req.originalUrl, 'REQ');
    res.status(sc.OK).json('Helix: A System for Patient Management [[API]]');
    logger.get(req.originalUrl, 'OK', 'Return API');
});

// Routers
app.use('/api/auth', authORoute);

// Protected routes
// app.use(auth.verifyToken);
app.use('/api/patients', patients);
app.use('/api/appointments', appointments);
app.use('/api/users', users);
app.use('/api/accounting', accounting)

// 404
app.all('*', (req: Request, res: Response, next: NextFunction) => {
    logger.get(req.originalUrl, 'REQ');
    res.status(sc.NOT_FOUND).json({ error: 'Not found' });
    logger.get(req.originalUrl, 'ERR', 'Not found');
});

// Errors
app.use(errorHandler);

// Start
app.listen(port, () => {
    logger.info(`Server listening on port ${port}`);
});
