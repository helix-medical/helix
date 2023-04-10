import { Request, Response } from 'express';
import db from '../database/config';
import logger from '../system/logger';
import sc from '../tools/statusCodes';
import uuid from '../tools/uuid';
import queries from '../database/queries';
import moment from 'moment';

const create = async (req: Request, res: Response) => {
    logger.post(req.originalUrl, 'REQ');
    let id = uuid();
    while (await queries.checkId(id, 'users')) id = uuid();
    const sqlQuery = 'INSERT INTO accounting (`uid`, `amount`, `method`, `date`, `appointment`) VALUES (?)';
    const values = [id, req.body.amount, req.body.method, req.body.date, req.body.appointment];

    db.query(sqlQuery, [values], (err: any, data: { insertId: any }) => {
        if (err) {
            logger.post(req.originalUrl, 'ERR', err);
            return res.status(sc.METHOD_FAILURE).json({ message: 'Method fails' });
        }
        logger.post(req.originalUrl, 'OK', `Transaction ${id} added`);
        return res.status(sc.OK).json({ id, message: `Transaction ${id} added` });
    });
};

const getTransactions = async (req: Request, res: Response) => {
    logger.get(req.originalUrl, 'REQ');
    const sqlQuery =
        'SELECT a.uid, a.amount, a.method, a.date, app.id, p.name AS patientName, p.`lastName` AS patientLastName ' +
        'FROM accounting a ' +
        'INNER JOIN appointments app ON a.appointment = app.id ' +
        'INNER JOIN patients p ON app.`patientId` = p.id ' +
        'WHERE a.date BETWEEN ? AND ?';
    const values = [req.params.start, req.params.end];

    db.query(sqlQuery, values, (err: any, data: any) => {
        if (err) {
            logger.get(req.originalUrl, 'ERR', err);
            return res.status(sc.BAD_REQUEST).json({ message: 'Bad request' });
        }
        logger.get(req.originalUrl, 'OK', 'Return all period transactions');
        return res.status(sc.OK).json(data);
    });
};

const getSum = async (req: Request, res: Response) => {
    logger.get(req.originalUrl, 'REQ');
    const sqlQuery = `SELECT 
        SUM(CASE WHEN COALESCE(method, '') = 'check' THEN amount ELSE 0 END) AS checks,
        SUM(CASE WHEN COALESCE(method, '') = 'card' THEN amount ELSE 0 END) AS cards,
        SUM(CASE WHEN COALESCE(method, '') = 'cash' THEN amount ELSE 0 END) AS cashs
    FROM accounting
    WHERE date BETWEEN ? AND ?`;
    const values = [req.params.start, req.params.end];

    db.query(sqlQuery, values, (err: any, data: any) => {
        if (err) {
            logger.get(req.originalUrl, 'ERR', err);
            return res.status(sc.BAD_REQUEST).json({ message: 'Bad request' });
        }

        const sum = data[0].checks + data[0].cards + data[0].cashs;
        logger.get(req.originalUrl, 'OK', 'Return period sum');
        return res.status(sc.OK).json({ ...data[0], sum });
    });
};

export default {
    create,
    getTransactions,
    getSum,
};
