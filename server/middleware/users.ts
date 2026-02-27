import { NextFunction, Request, Response } from 'express';
import validate from '../validation/validator';
import logger from '../tools/logger';
import sc from '../tools/status-codes';

const create = (req: Request, res: Response, next: NextFunction) => {
  const isValid = validate.userCreate(req.body);
  if (!isValid) {
    logger.fail(req, res, 'Invalid request body');
    res.status(sc.NOT_ACCEPTABLE).json(validate.userCreate.errors);
  } else {
    logger.success(req, res, 'Valid request body');
    next();
  }
};

export default module.exports = {
  create,
};
