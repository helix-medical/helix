import { Response, Request, NextFunction } from 'express';
import validate from '../validation/validator';
import logger from '../tools/logger';
import sc from '../tools/status-codes';

const create = async (req: Request, res: Response, next: NextFunction) => {
    const isValid = validate.appointmentCreate(req.body);
    if (!isValid) {
        res.status(sc.NOT_ACCEPTABLE).json(validate.appointmentCreate.errors);
        logger.fail(req, res, 'Invalid request body');
    } else {
        logger.success(req, res, 'Valid request body');
        next();
    }
};

const update = async (req: Request, res: Response, next: NextFunction) => {
    const isValid = validate.appointmentUpdate(req.body);
    if (!isValid) {
        res.status(sc.NOT_ACCEPTABLE).json(validate.appointmentUpdate.errors);
        logger.fail(req, res, 'Invalid request body');
    } else {
        logger.success(req, res, 'Valid request body');
        next();
    }
};

export default {
    create,
    update,
};
