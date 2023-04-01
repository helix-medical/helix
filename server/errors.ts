import { Response, NextFunction, Request } from 'express';
import sc from './tools/statusCodes';
import logger from './system/logger';

const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    logger.err(err.message);
    res.status(sc.INTERNAL_SERVER_ERROR).json({ error: err.message });
};

export default errorHandler;
