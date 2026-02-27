import { NextFunction, Request, Response } from 'express';
import sc from './status-codes';
import log from './newLogger';

const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  log.message(err.message);
  res.status(sc.INTERNAL_SERVER_ERROR).json({ error: err.message });
};

export default errorHandler;
