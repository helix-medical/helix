import { Response, Request, NextFunction } from 'express';
import validate from '../validation/validator';
import logger from '../system/logger';
import sc from '../tools/statusCodes';

const create = async (req: Request, res: Response, next: NextFunction) => {
    logger.use(req.originalUrl, 'REQ');
    const isValid = validate.appointmentCreate(req.body);
    if (!isValid) {
        logger.use(req.originalUrl, 'ERR', 'Invalid request body');
        return res.status(sc.NOT_ACCEPTABLE).json(validate.appointmentCreate.errors);
    }
    logger.use(req.originalUrl, 'OK', 'Valid request body');
    next();
};

const update = async (req: Request, res: Response, next: NextFunction) => {
    logger.use(req.originalUrl, 'REQ');
    const isValid = validate.appointmentUpdate(req.body);
    if (!isValid) {
        logger.use(req.originalUrl, 'ERR', 'Invalid request body');
        return res.status(sc.NOT_ACCEPTABLE).json(validate.appointmentUpdate.errors);
    }
    logger.use(req.originalUrl, 'OK', 'Valid request body');
    next();
};

export default module.exports = {
    create,
    update,
};
