import { Response, Request } from 'express';
import db from '../database/config';
import logger from '../system/logger';
import sc from '../tools/statusCodes';

const readAll = async (req: Request, res: Response) => {
    logger.get(req.originalUrl, 'REQ');
    const sqlQuery = `
    SELECT appointments.id, appointments.date, appointments.reasons, appointments.status, patients.name, patients.lastName, patients.sex 
    FROM appointments INNER JOIN patients ON appointments.patientId = patients.id
    `;
    db.query(sqlQuery, (err: any, data: any) => {
        if (err) {
            logger.get(req.originalUrl, 'ERR', err);
            return res.status(sc.BAD_REQUEST).json(err);
        }
        logger.get(req.originalUrl, 'OK', 'Return all appointments');
        return res.status(sc.OK).json(data);
    });
};

export default module.exports = {
    readAll,
};
