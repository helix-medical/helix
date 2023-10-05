import { Request, Response } from 'express';
import db from '../database/config';
import sc from '../tools/status-codes';
import logger from '../tools/logger';

interface IId {
    id: string;
    name: string;
    verb?: string;
}

const checkId = async (id: string, table: string, parameter: string): Promise<boolean> => {
    const sqlQuery = `SELECT COUNT(*) AS count FROM ${table} WHERE ${parameter} = ?`;
    const values = [id];

    return new Promise((resolve, reject) => {
        db.query(sqlQuery, values, (err: any, data: any) => {
            if (err) {
                logger.error(err);
                reject(err);
            } else {
                resolve(data[0].count !== 0);
            }
        });
    });
};

const push = async (req: Request, res: Response, sqlQuery: string, values: any[], meta: IId) => {
    db.query(sqlQuery, values, (err: any, data: any) => {
        if (err) {
            res.status(sc.BAD_REQUEST).json({ message: 'Bad Request' });
            logger.fail(req, res, err);
        } else if (data.affectedRows === 0) {
            res.status(sc.INTERNAL_SERVER_ERROR).json({ message: 'Data not pushed' });
            logger.fail(req, res, `${meta.name} ${meta.id} not pushed`);
        } else {
            res.status(sc.OK).json({ id: meta.id, message: `${meta.name} ${meta.id} ${meta.verb ?? 'pushed'}` });
            logger.success(req, res, `${meta.name} ${meta.id} ${meta.verb ?? 'pushed'}}`);
        }
    });
};

const pull = async (req: Request, res: Response, sqlQuery: string, values: any[], meta: IId) => {
    db.query(sqlQuery, values, (err: any, data: any) => {
        if (err) {
            res.status(sc.METHOD_FAILURE).json({ message: 'Method fails' });
            logger.fail(req, res, err);
        } else if (data.length === 0) {
            res.status(sc.NOT_FOUND).json({ message: `${meta.name} not found` });
            logger.fail(req, res, `${meta.name} ${meta.id} not found`);
        } else {
            res.status(sc.OK).json(data);
            logger.success(req, res, `${meta.name} ${meta.id} ${meta.verb ?? 'pulled'}`);
        }
    });
};

export default module.exports = {
    checkId,
    push,
    pull,
};
