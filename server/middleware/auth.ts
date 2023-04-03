import { Response, Request, NextFunction } from 'express';
import validate from '../validation/validator';
import logger from '../system/logger';
import sc from '../tools/statusCodes';
import queries from '../database/queries';

const login = async (req: Request, res: Response, next: NextFunction) => {
    logger.use(req.originalUrl, 'REQ');
    const isValid = validate.login(req.body);
    if (!isValid) {
        logger.use(req.originalUrl, 'ERR', 'Invalid request body');
        return res.status(sc.NOT_ACCEPTABLE).json(validate.login.errors);
    }

    logger.use(req.originalUrl, 'OK', 'Valid request body');
    next();
};

export default module.exports = {
    login,
};