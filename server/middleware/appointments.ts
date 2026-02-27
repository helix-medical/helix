import { NextFunction, Request, Response } from 'express';
import validate from '../validation/validator';
import logger from '../tools/logger';
import log from '../tools/newLogger';
import sc from '../tools/status-codes';

const create = async (req: Request, res: Response, next: NextFunction) => {
  const isValid = validate.appointmentCreate(req.body);
  if (!isValid) {
    log.message('Invalid request body');
    res.status(sc.NOT_ACCEPTABLE).json(validate.appointmentCreate.errors);
  } else {
    logger.success(req, res, 'Valid request body');
    next();
  }
};

const update = async (req: Request, res: Response, next: NextFunction) => {
  const isValid = validate.appointmentUpdate(req.body);
  if (!isValid) {
    log.message('Invalid request body');
    res.status(sc.NOT_ACCEPTABLE).json(validate.appointmentUpdate.errors);
  } else {
    logger.success(req, res, 'Valid request body');
    next();
  }
};

export default {
  create,
  update,
};
