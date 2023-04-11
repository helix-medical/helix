import express, { Express, NextFunction, Request, Response } from 'express';
import cors from './config/cors';
require('dotenv').config();
import patients from './routers/patients';
import appointments from './routers/appointments';
import authORoute from './routers/auth';
import accounting from './routers/accounting';
import users from './routers/users';
import errorHandler from './system/errors';
import sc from './tools/statusCodes';
// import auth from './middleware/auth';
import cookieParser from 'cookie-parser';
import credentials from './middleware/credentials';
import logger from './system/logger';

// Config
const app: Express = express();
const port = process.env.PORT_API || 3001;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(credentials);
app.use(cors());
app.use(cookieParser());

// Logger
app.use(logger.checkpoint);

// Main
app.get('/api', (req: Request, res: Response) => {
    res.status(sc.OK).json({ message: 'Helix: A System for Patient Management [[API]]' });
    logger.success(req, res, 'Return API');
});

// Routers
app.use('/api/auth', authORoute);

// Protected routes
// app.use(auth.verifyToken);
app.use('/api/patients', patients);
app.use('/api/appointments', appointments);
app.use('/api/users', users);
app.use('/api/accounting', accounting);

// 404
app.all('*', (req: Request, res: Response) => {
    res.status(sc.NOT_FOUND).json({ error: 'Not found' });
    logger.fail(req, res, 'Not found');
});

// Errors
app.use(errorHandler);

// Start
app.listen(port, () => {
    logger.info(`Server listening on port ${port}`);
});
