import { Response, Request } from 'express';
import db from '../database/config';
import sc from '../tools/statusCodes';
import logger from '../system/logger';
import moment from 'moment';

const readAll = async (req: Request, res: Response) => {
    const sqlQuery = `
        SELECT app.id, app.date, app.kind, app.status, p.name, p.lastName, p.sex
        FROM appointments app
        INNER JOIN patients p ON app.patientId = p.id `;

    let addOn = '';
    if (req.params.period === 'past') {
        addOn = `WHERE app.date < '${moment().format('YYYY-MM-DD HH:mm')}'`;
    } else if (req.params.period === 'upcoming') {
        addOn = `WHERE app.date > '${moment().format('YYYY-MM-DD HH:mm')}'`;
    }

    db.query(sqlQuery + addOn + 'ORDER BY app.date ASC', (err: any, data: any) => {
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
