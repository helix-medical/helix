import { Request, Response } from 'express';
import db from '../database/config';
import logger from '../system/logger';
import sc from '../tools/statusCodes';
import uuid from '../tools/uuid';
import queries from '../database/queries';

const create = async (req: Request, res: Response) => {
    logger.post(req.originalUrl, 'REQ');
    let id = uuid();
    while (await queries.checkId(id, 'users')) id = uuid();
    const sqlQuery = 'INSERT INTO accounting (`uid`, `amount`, `patientId`, `method`, `date`, `appId`) VALUES (?)';
    const values = [id, req.body.amount, req.body.patientId, req.body.method, req.body.date, req.body.appId];

    db.query(sqlQuery, [values], (err: any, data: { insertId: any }) => {
        if (err) {
            logger.post(req.originalUrl, 'ERR', err);
            return res.status(sc.METHOD_FAILURE).json({ message: 'Method fails' });
        }
        logger.post(req.originalUrl, 'OK', `Transaction ${id} added`);
        return res.status(sc.OK).json({ id, message: `Transaction ${id} added` });
    });
};

const readAll = async (req: Request, res: Response) => {
    logger.get(req.originalUrl, 'REQ');
    const sqlQuery = 'SELECT * FROM accounting';

    db.query(sqlQuery, (err: any, data: any) => {
        if (err) {
            logger.get(req.originalUrl, 'ERR', err);
            return res.status(sc.BAD_REQUEST).json({ message: 'Bad request' });
        }
        logger.get(req.originalUrl, 'OK', 'Return all transactions');
        return res.status(sc.OK).json(data);
    });
};

export default {
    create,
    readAll,
};
