import { Response, Request } from 'express';
import db from '../database/config';
import logger from '../system/logger';
import sc from '../tools/statusCodes';

const readAll = async (req: Request, res: Response) => {
    logger.get(req.originalUrl, 'REQ');
    const sqlQuery = `
        SELECT app.id, app.date, app.kind, app.status, p.name, p.lastName, p.sex
        FROM appointments app
        INNER JOIN patients p ON app.patientId = p.id`;
    db.query(sqlQuery, (err: any, data: any) => {
        if (err) {
            logger.get(req.originalUrl, 'ERR', err);
            return res.status(sc.BAD_REQUEST).json({ message: 'Bad request' });
        }
        logger.get(req.originalUrl, 'OK', 'Return all appointments');
        return res.status(sc.OK).json(data);
    });
};

export default module.exports = {
    readAll,
};
