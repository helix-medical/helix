import { Response, Request } from 'express';
import uuid from '../tools/uuid';
import queries from '../database/queries';
import bcrypt from 'bcrypt';

const readAll = async (req: Request, res: Response) => {
    const sqlQuery = `
        SELECT
            uid,
            name,
            lastName,
            clearPassword,
            lastActive,
            state,
            role
        FROM
            users
        ORDER BY
            name ASC
    `;
    await queries.pull(req, res, sqlQuery, [], { id: '', name: 'Users', verb: 'returned' });
};

const getForConnection = async (req: Request, res: Response) => {
    const sqlQuery = `
        SELECT
            name,
            lastName,
            uid
        FROM
            users
        WHERE
            state != "disabled"
        ORDER BY
            name ASC
    `;
    await queries.pull(req, res, sqlQuery, [], { id: '', name: 'Users', verb: 'returned for connection' });
};

const getPractitioners = async (req: Request, res: Response) => {
    const sqlQuery = `
        SELECT
            name,
            lastName,
            uid
        FROM
            users
        WHERE
            role = "practitioner" 
            AND state != "disabled"
        ORDER BY
            name ASC
    `;
    await queries.pull(req, res, sqlQuery, [], { id: '', name: 'Practitioners', verb: 'returned for appointment' });
};

const readOne = async (req: Request, res: Response) => {
    const sqlQuery = `
        SELECT
            uid,
            name,
            lastName,
            lastActive,
            state,
            role
        FROM
            users
        WHERE
            uid = ?
    `;
    await queries.pull(req, res, sqlQuery, [req.params.id], { id: req.params.id, name: 'User', verb: 'returned' });
};

const create = async (req: Request, res: Response) => {
    let id = uuid();
    while (await queries.checkId(id, 'users', 'uid')) id = uuid();
    const sqlQuery = `
        INSERT INTO
            users (
                uid,
                name,
                lastName,
                role,
                state,
                password,
                clearPassword,
                lastActive
            )
        VALUES
            (?)
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

    await queries.push(req, res, sqlQuery, [values], { id, name: 'User', verb: 'created' });
};

const disable = async (req: Request, res: Response) => {
    const sqlQuery = `
        UPDATE
            users
        SET
            state = "disabled"
        WHERE
            uid = ?
    `;
    await queries.push(req, res, sqlQuery, [req.params.id], { id: req.params.id, name: 'User', verb: 'disabled' });
};

const enable = async (req: Request, res: Response) => {
    const sqlQuery = `
        UPDATE
            users
        SET
            state = "regular"
        WHERE
            uid = ?
    `;
    await queries.push(req, res, sqlQuery, [req.params.id], { id: req.params.id, name: 'User', verb: 'enabled' });
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
