import { Response, Request, NextFunction } from 'express';
import validate from '../validation/validator';
import logger from '../system/logger';
import sc from '../tools/statusCodes';

const create = (req: Request, res: Response, next: NextFunction) => {
    logger.use(req.originalUrl, 'REQ');
    const isValid = validate.patientCreate(req.body);
    if (!isValid) {
        logger.use(req.originalUrl, 'ERR', 'Invalid request body');
        return res.status(sc.NOT_ACCEPTABLE).json(validate.patientCreate.errors);
    }
    logger.use(req.originalUrl, 'OK', 'Valid request body');
    next();
};

const update = (req: Request, res: Response, next: NextFunction) => {
    logger.use(req.originalUrl, 'REQ');
    const isValid = validate.patientUpdate(req.body);
    if (!isValid) {
        logger.use(req.originalUrl, 'ERR', 'Invalid request body');
        return res.status(sc.NOT_ACCEPTABLE).json(validate.patientUpdate.errors);
    }
    logger.use(req.originalUrl, 'OK', 'Valid request body');
    next();
};

const addAppointment = (req: Request, res: Response, next: NextFunction) => {
    logger.use(req.originalUrl, 'REQ');
    const isValid = validate.patientAddAppointment(req.body);
    if (!isValid) {
        logger.use(req.originalUrl, 'ERR', 'Invalid request body');
        return res.status(sc.NOT_ACCEPTABLE).json(validate.patientAddAppointment.errors);
    }
    logger.use(req.originalUrl, 'OK', 'Valid request body');
    next();
};

export default module.exports = {
    update,
    create,
    addAppointment,
};
