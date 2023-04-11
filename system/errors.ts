import { Response, NextFunction, Request } from 'express';
import sc from '../tools/statusCodes';
import logger from './logger';

const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    logger.error(err.message);
    res.status(sc.INTERNAL_SERVER_ERROR).json({ error: err.message });
};

export default errorHandler;
