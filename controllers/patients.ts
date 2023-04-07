import { Response, Request } from 'express';
import db from '../database/config';
import logger from '../system/logger';
import sc from '../tools/statusCodes';

const readAll = async (req: Request, res: Response) => {
    logger.get(req.originalUrl, 'REQ');
    const sqlQuery = `
    SELECT *
    FROM patients
    `;
    db.query(sqlQuery, (err: any, data: any) => {
        if (!err) {
            logger.get(req.originalUrl, 'OK', 'Return all patients');
            return res.status(sc.OK).json(data);
        }

        logger.get(req.originalUrl, 'ERR', err);
        return res.status(sc.BAD_REQUEST).json({ message: 'Error while getting patients list', data: [] });
    });
};

export default module.exports = {
    readAll,
};
