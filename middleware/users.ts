import { Response, Request, NextFunction } from 'express';
import validate from '../validation/validator';
import logger from '../tools/logger';
import sc from '../tools/statusCodes';

const create = (req: Request, res: Response, next: NextFunction) => {
    const isValid = validate.userCreate(req.body);
    if (!isValid) {
        res.status(sc.NOT_ACCEPTABLE).json(validate.userCreate.errors);
        logger.fail(req, res, 'Invalid request body');
    } else {
        logger.success(req, res, 'Valid request body');
        next();
    }
};

export default module.exports = {
    create,
};
