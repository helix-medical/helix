import { Response, Request } from 'express';
import db from '../database/config';
import logger from '../system/logger';
import sc from '../tools/statusCodes';
import uuid from '../tools/uuid';
import queries from '../database/queries';

const create = async (req: Request, res: Response) => {
    logger.post(req.originalUrl, 'REQ');
    let id = uuid();
    while (await queries.checkId(id, 'users')) id = uuid();
    const sqlQuery =
        'INSERT ' +
        'INTO patients ' +
        '(`id`, `name`, `lastName`, `birthDate`, `sex`, `email`, `city`, `nextApp`, `passif`) VALUES (?)';
    const values = [
        id,
        req.body.name,
        req.body.lastName,
        req.body.birthDate,
        req.body.sex,
        req.body.email,
        req.body.city,
        req.body.nextApp,
        req.body.passif,
    ];

    db.query(sqlQuery, [values], (err: any, data: any) => {
        if (err) {
            logger.post(req.originalUrl, 'ERR', err);
            return res.status(sc.METHOD_FAILURE).json(err);
        }
        logger.post(req.originalUrl, 'OK', `Patient ${id} added`);
        return res.status(sc.OK).json(`Patient ${id} added`);
    });
};

const read = async (req: Request, res: Response) => {
    logger.get(req.originalUrl, 'REQ');
    const patientId = req.params.id;
    const sqlQuery = `
    SELECT *
    FROM patients
    WHERE id = ?
    `;
    db.query(sqlQuery, patientId, (err: any, data: any) => {
        if (!err) {
            if (data.length === 0) {
                logger.get(req.originalUrl, 'ERR', `Patient ${patientId} not found`);
                return res.status(sc.NOT_FOUND).json(`Patient ${patientId} not found`);
            }

            logger.get(req.originalUrl, 'OK', `Patient ${patientId} found`);
            return res.status(sc.OK).json(data);
        }

        logger.get(req.originalUrl, 'ERR', err);
        return res.status(sc.BAD_REQUEST).json(err);
    });
};

const update = async (req: Request, res: Response) => {
    logger.put(req.originalUrl, 'REQ');
    const patientId = req.params.id;
    const sqlQuery =
        'UPDATE patients ' +
        'SET `name` = ?, `lastName` = ?, `birthDate` = ?, `sex` = ?, `email` = ?, `city` = ?, `passif` = ? ' +
        'WHERE id = ?';
    const values = [
        req.body.name,
        req.body.lastName,
        req.body.birthDate,
        req.body.sex,
        req.body.email,
        req.body.city,
        req.body.passif,
    ];

    db.query(sqlQuery, [...values, patientId], (err: any, data: any) => {
        if (err) {
            logger.put(req.originalUrl, 'ERR', err);
            return res.status(sc.METHOD_FAILURE).json(err);
        }
        logger.put(req.originalUrl, 'OK', `Patient ${patientId} updated`);
        return res.status(sc.OK).json(`Patient ${patientId} updated`);
    });
};

const addAppointment = async (req: Request, res: Response) => {
    logger.put(req.originalUrl, 'REQ');
    const patientId = req.params.id;
    const sqlQuery =
        'UPDATE patients ' + 'SET `passif` = JSON_ARRAY_APPEND(`passif`, "$.lastAppointments", ?) ' + 'WHERE id = ?';
    const values = [req.body.id];

    db.query(sqlQuery, [...values, patientId], (err: any, data: any) => {
        if (err) {
            logger.put(req.originalUrl, 'ERR', err);
            return res.status(sc.METHOD_FAILURE).json(err);
        }
        logger.put(req.originalUrl, 'OK', `Appointment ${req.body.id} added to patient ${patientId}`);
        return res.status(sc.OK).json(data);
    });
};

const delete_ = async (req: Request, res: Response) => {
    logger.del(req.originalUrl, 'REQ');
    const patientId = req.params.id;
    const sqlQuery = `DELETE 
    FROM patients
    WHERE id = ?
    `;

    db.query(sqlQuery, patientId, (err: any, data: any) => {
        if (err) {
            logger.del(req.originalUrl, 'ERR', err);
            return res.status(sc.METHOD_FAILURE).json(err);
        }
        if (data.affectedRows === 0) {
            logger.del(req.originalUrl, 'ERR', `Patient ${patientId} not found`);
            return res.status(sc.NOT_FOUND).json(`Patient ${patientId} not found`);
        }

        logger.del(req.originalUrl, 'OK', `Patient ${patientId} deleted`);
        return res.status(sc.OK).json(`Patient ${patientId} deleted`);
    });
};

export default module.exports = {
    create,
    read,
    update,
    delete: delete_,
    addAppointment,
};
