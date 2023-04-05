import { Response, Request } from 'express';
import db from '../database/config';
import logger from '../system/logger';
import sc from '../tools/statusCodes';
import uuid from '../tools/uuid';
import queries from '../database/queries';
import bcrypt from 'bcrypt';

const readAll = async (req: Request, res: Response) => {
    logger.get(req.originalUrl, 'REQ');
    const sqlQuery = `SELECT uid, name, lastName, clearPassword, lastActive, state, role FROM users`;
    db.query(sqlQuery, (err: any, data: any) => {
        if (!err) {
            logger.get(req.originalUrl, 'OK', 'Return all users');
            return res.status(sc.OK).json(data);
        }
        logger.get(req.originalUrl, 'ERR', err);
        return res.status(sc.BAD_REQUEST).json(err);
    });
};

const getForConnection = async (req: Request, res: Response) => {
    logger.get(req.originalUrl, 'REQ');
    const sqlQuery = 'SELECT `name`, `lastName`, `uid` FROM users WHERE state != "disabled"';
    db.query(sqlQuery, (err: any, data: any) => {
        if (!err) {
            logger.get(req.originalUrl, 'OK', 'Return all users');
            return res.status(sc.OK).json(data);
        }
        logger.get(req.originalUrl, 'ERR', err);
        return res.status(sc.BAD_REQUEST).json(err);
    });
};

const readOne = async (req: Request, res: Response) => {
    logger.get(req.originalUrl, 'REQ');
    const sqlQuery = `SELECT uid, name, lastName, lastActive, state, role FROM users WHERE uid = ?`;
    db.query(sqlQuery, [req.params.id], (err: any, data: any) => {
        if (!err) {
            logger.get(req.originalUrl, 'OK', `Return user ${req.params.id}`);
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
    INSERT INTO users (uid, name, lastName, role, state, password, clearPassword)
    VALUES (?)
    `;
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const values = [
        id,
        req.body.name,
        req.body.lastName,
        req.body.role,
        'first-time',
        hashedPassword,
        req.body.password,
    ];

    db.query(sqlQuery, [values], (err: any, data: { insertId: any }) => {
        if (!err) {
            logger.post(req.originalUrl, 'OK', `User ${id} created`);
            return res.status(sc.CREATED).json({ id: id, message: `User ${id} created` });
        }
        logger.post(req.originalUrl, 'ERR', err);
        return res.status(sc.BAD_REQUEST).json({ message: err.message });
    });
};

export default module.exports = {
    readAll,
    create,
    getForConnection,
    readOne,
};
