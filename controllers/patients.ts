import { Response, Request } from 'express';
import db from '../database/config';
import logger from '../system/logger';
import sc from '../tools/statusCodes';

const readAll = async (req: Request, res: Response) => {
    const sqlQuery = `
        SELECT
            *
        FROM
            patients
        ORDER BY
            name ASC
    `;
    db.query(sqlQuery, (err: any, data: any) => {
        if (err) {
            res.status(sc.BAD_REQUEST).json({ message: 'Error while getting patients list' });
            logger.fail(req, res, err);
        } else if (data.length === 0) {
            res.status(sc.NOT_FOUND).json({ message: `Patients not found` });
            logger.fail(req, res, `Patients not found`);
        } else {
            res.status(sc.OK).json(data);
            logger.success(req, res, `Return all patients`);
        }
    });
};

const readAllConnexion = async (req: Request, res: Response) => {
    const sqlQuery = `SELECT id, name, lastName FROM patients`;
    db.query(sqlQuery, (err: any, data: any) => {
        if (err) {
            res.status(sc.BAD_REQUEST).json({ message: 'Error while getting patients list' });
            logger.fail(req, res, err);
        } else if (data.length === 0) {
            res.status(sc.NOT_FOUND).json({ message: `Patients not found` });
            logger.fail(req, res, `Patients not found`);
        } else {
            res.status(sc.OK).json(data);
            logger.success(req, res, `Return all patients for Appointments`);
        }
    });
};

export default module.exports = {
    readAll,
    readAllConnexion,
};
