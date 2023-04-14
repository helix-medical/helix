import { Response, Request } from 'express';
import db from '../database/config';
import logger from '../system/logger';
import sc from '../tools/statusCodes';
import uuid from '../tools/uuid';
import queries from '../database/queries';
import bcrypt from 'bcrypt';

const readAll = async (req: Request, res: Response) => {
    const sqlQuery = `SELECT uid, name, lastName, clearPassword, lastActive, state, role FROM users ORDER BY name`;
    db.query(sqlQuery, (err: any, data: any) => {
        if (err) {
            res.status(sc.BAD_REQUEST).json({ message: 'Bad request' });
            logger.fail(req, res, err);
        } else if (data.length === 0) {
            res.status(sc.NOT_FOUND).json({ message: `Users not found` });
            logger.fail(req, res, `Users not found`);
        } else {
            res.status(sc.OK).json(data);
            logger.success(req, res, `Return all users`);
        }
    });
};

const getForConnection = async (req: Request, res: Response) => {
    const sqlQuery = 'SELECT `name`, `lastName`, `uid` FROM users WHERE state != "disabled" ORDER BY `name` ASC';
    db.query(sqlQuery, (err: any, data: any) => {
        if (err) {
            res.status(sc.BAD_REQUEST).json({ message: 'Bad request' });
            logger.fail(req, res, err);
        } else if (data.length === 0) {
            res.status(sc.NOT_FOUND).json({ message: `Users not found` });
            logger.fail(req, res, `Users not found`);
        } else {
            res.status(sc.OK).json(data);
            logger.success(req, res, `Return all users for Connection`);
        }
    });
};

const getPractitioners = async (req: Request, res: Response) => {
    const sqlQuery =
        'SELECT `name`, `lastName`, `uid` FROM users WHERE role = "practitioner" AND state != "disabled" ORDER BY `name` ASC';
    db.query(sqlQuery, (err: any, data: any) => {
        if (err) {
            res.status(sc.BAD_REQUEST).json({ message: 'Bad request' });
            logger.fail(req, res, err);
        } else if (data.length === 0) {
            res.status(sc.NOT_FOUND).json({ message: `Practitioners not found` });
            logger.fail(req, res, `Practitioners not found`);
        } else {
            res.status(sc.OK).json(data);
            logger.success(req, res, `Return all users for Connection`);
        }
    });
};

const readOne = async (req: Request, res: Response) => {
    const sqlQuery = `SELECT uid, name, lastName, lastActive, state, role FROM users WHERE uid = ?`;
    db.query(sqlQuery, [req.params.id], (err: any, data: any) => {
        if (err) {
            res.status(sc.OK).json(data);
            logger.fail(req, res, err);
        } else if (data.length === 0) {
            res.status(sc.NOT_FOUND).json({ message: `User ${req.params.id} not found` });
            logger.fail(req, res, `User ${req.params.id} not found`);
        } else {
            res.status(sc.OK).json(data);
            logger.success(req, res, `Return user ${req.params.id}`);
        }
    });
};

const create = async (req: Request, res: Response) => {
    let id = uuid();
    while (await queries.checkId(id, 'users', 'uid')) id = uuid();
    const sqlQuery = `
    INSERT INTO users (uid, name, lastName, role, state, password, clearPassword, lastActive)
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
        '1970-01-01 00:00:00',
    ];

    db.query(sqlQuery, [values], (err: any, data: any) => {
        if (err) {
            res.status(sc.BAD_REQUEST).json({ message: 'Bad request' });
            logger.fail(req, res, err);
        } else {
            res.status(sc.CREATED).json({ id: id, message: `User ${id} created` });
            logger.success(req, res, `User ${id} created`);
        }
    });
};

const disable = async (req: Request, res: Response) => {
    const sqlQuery = `UPDATE users SET state = "disabled" WHERE uid = ?`;
    db.query(sqlQuery, [req.params.id], (err: any, data: any) => {
        if (err) {
            res.status(sc.BAD_REQUEST).json({ message: 'Bad request' });
            logger.fail(req, res, err);
        } else if (data.affectedRows === 0) {
            res.status(sc.NOT_FOUND).json({ message: `User ${req.params.id} not found` });
            logger.fail(req, res, `User ${req.params.id} not found`);
        } else {
            res.status(sc.OK).json({ message: `User ${req.params.id} disabled` });
            logger.success(req, res, `User ${req.params.id} disabled`);
        }
    });
};

const enable = async (req: Request, res: Response) => {
    const sqlQuery = `UPDATE users SET state = "regular" WHERE uid = ?`;
    db.query(sqlQuery, [req.params.id], (err: any, data: any) => {
        if (err) {
            res.status(sc.BAD_REQUEST).json({ message: 'Bad request' });
            logger.fail(req, res, err);
        } else if (data.affectedRows === 0) {
            res.status(sc.NOT_FOUND).json({ message: `User ${req.params.id} not found` });
            logger.fail(req, res, `User ${req.params.id} not found`);
        } else {
            res.status(sc.OK).json({ message: `User ${req.params.id} enabled` });
            logger.success(req, res, `User ${req.params.id} enabled`);
        }
    });
};

export default {
    readAll,
    create,
    getForConnection,
    readOne,
    getPractitioners,
    disable,
    enable,
};
