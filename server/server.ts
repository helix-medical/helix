import cookieParser from 'cookie-parser';
import cors from './config/cors';
import credentials from './middleware/credentials';
import errorHandler from './tools/errors';
import express, { Express, Request, Response } from 'express';
import logger from './tools/logger';
import path from 'path';
// import rateLimit from 'express-rate-limit';
import sc from './tools/status-codes';
import server from './routers/api';
require('dotenv').config();

// Config
const api: Express = express();
const port = 3001;
// const limiter = rateLimit({
//     windowMs: 60 * 1000,
//     max: 40,
// });

api.use(express.json());
api.use(express.urlencoded({ extended: true }));
api.use(credentials);
api.use(cors());
api.use(cookieParser());
// api.use(limiter);

// Static www
api.use(express.static(path.join(__dirname, 'www')));

// Logger
api.use(logger.checkpoint);

// Main
api.use('/api', server);

// Client
api.get('*', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, 'www', 'index.html'));
  logger.success(req, res, 'Return client');
});

// 404
api.all('*', (req: Request, res: Response) => {
  res.status(sc.NOT_FOUND).json({ error: 'Route not found' });
  logger.fail(req, res, 'Not found');
});

// Errors
api.use(errorHandler);

// Start
api.listen(port, () => {
  logger.info(`Server listening on port ${port}`);
});
