import { Response, Request } from 'express';
import db from '../database/config';
import sc from '../tools/statusCodes';
import logger from '../system/logger';

const readAll = async (req: Request, res: Response) => {
    const sqlQuery = `
        SELECT app.id, app.date, app.kind, app.status, p.name, p.lastName, p.sex
        FROM appointments app
        INNER JOIN patients p ON app.patientId = p.id
        ORDER BY app.date ASC`;
    db.query(sqlQuery, (err: any, data: any) => {
        if (err) {
            res.status(sc.BAD_REQUEST).json({ message: 'Bad request' });
            logger.fail(req, res, err);
        } else if (data.length === 0) {
            res.status(sc.NOT_FOUND).json({ message: 'No appointment found' });
            logger.fail(req, res, 'No appointment found');
        } else {
            res.status(sc.OK).json(data);
            logger.success(req, res, 'Return all appointments');
        }
    });
};

export default module.exports = {
    readAll,
};
