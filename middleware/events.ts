import { Response, Request, NextFunction } from 'express';
import validate from '../validation/validator';
import logger from '../system/logger';
import sc from '../tools/statusCodes';

const create = async (req: Request, res: Response, next: NextFunction) => {
    const isValid = validate.eventCreate(req.body);
    if (!isValid) {
        res.status(sc.NOT_ACCEPTABLE).json(validate.eventCreate.errors);
        logger.fail(req, res, 'Invalid request body');
    } else {
        logger.success(req, res, 'Valid request body');
        next();
    }
};

export default {
    create,
};
