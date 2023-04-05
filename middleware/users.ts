import { Response, Request, NextFunction } from 'express';
import validate from '../validation/validator';
import logger from '../system/logger';
import sc from '../tools/statusCodes';

const create = (req: Request, res: Response, next: NextFunction) => {
    logger.use(req.originalUrl, 'REQ');
    const isValid = validate.userCreate(req.body);
    if (!isValid) {
        logger.post(req.originalUrl, 'ERR', 'Invalid request body');
        return res.status(sc.NOT_ACCEPTABLE).json(validate.userCreate.errors);
    }
    logger.use(req.originalUrl, 'OK', 'Valid request body');
    next();
};

export default module.exports = {
    create,
};
