import { Response, Request } from 'express';
import db from '../database/config';
import logger from '../system/logger';
import sc from '../tools/statusCodes';
import uuid from '../tools/uuid';
import queries from '../database/queries';

const readAll = async (req: Request, res: Response) => {
    logger.get(req.originalUrl, 'REQ');
    const sqlQuery = `
    SELECT *
    FROM users
    `;
    db.query(sqlQuery, (err: any, data: any) => {
        if (!err) {
            logger.get(req.originalUrl, 'OK', 'Return all users');
            return res.status(sc.OK).json(data);
        }
        logger.get(req.originalUrl, 'ERR', err);
        return res.status(sc.BAD_REQUEST).json(err);
    });
};

const create = async (req: Request, res: Response) => {
    logger.post(req.originalUrl, 'REQ');
    let id = uuid();
    while (await queries.checkId(id, 'users')) id = uuid();
    const sqlQuery = `
    INSERT INTO users (uid, username, password, role)
    VALUES (?)
    `;
    const values = [id, req.body.username, req.body.password, req.body.role];

    db.query(sqlQuery, [values], (err: any, data: { insertId: any }) => {
        if (!err) {
            logger.post(req.originalUrl, 'OK', `User ${id} created`);
            return res.status(sc.CREATED).json({ id, username: req.body.username, role: req.body.role });
        }
        logger.post(req.originalUrl, 'ERR', err);
        return res.status(sc.BAD_REQUEST).json(err);
    });
};

export default module.exports = {
    readAll,
    create,
};
