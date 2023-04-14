import { Response, Request } from 'express';
import db from '../database/config';
import logger from '../system/logger';
import sc from '../tools/statusCodes';
import uuid from '../tools/uuid';
import queries from '../database/queries';

const create = async (req: Request, res: Response) => {
    let id = uuid();
    while (await queries.checkId(id, 'users', 'id')) id = uuid();
    const sqlQuery =
        'INSERT ' +
        'INTO patients ' +
        '(`id`, `name`, `lastName`, `birthDate`, `sex`, `email`, `phone`, `address`, `city`, `job`, `doctor`, `passif`) VALUES (?)';
    const values = [
        id,
        req.body.name,
        req.body.lastName,
        req.body.birthDate,
        req.body.sex,
        req.body.email,
        req.body.phone,
        req.body.address,
        req.body.city,
        req.body.job,
        req.body.doctor,
        req.body.passif,
    ];

    db.query(sqlQuery, [values], (err: any, data: any) => {
        if (err) {
            res.status(sc.METHOD_FAILURE).json({ message: 'Method fails' });
            logger.fail(req, res, err);
        } else {
            res.status(sc.OK).json({ message: `Patient ${id} added` });
            logger.success(req, res, `Patient ${id} added`);
        }
    });
};

const read = async (req: Request, res: Response) => {
    const patientId = req.params.id;
    const sqlQuery = `
    SELECT *
    FROM patients
    WHERE id = ?
    `;
    db.query(sqlQuery, patientId, (err: any, data: any) => {
        if (err) {
            res.status(sc.BAD_REQUEST).json({ message: 'Bad request' });
            logger.fail(req, res, err);
        } else if (data.length === 0) {
            res.status(sc.NOT_FOUND).json({ message: `Patient ${patientId} not found` });
            logger.fail(req, res, `Patient ${patientId} not found`);
        } else {
            res.status(sc.OK).json(data);
            logger.success(req, res, `Patient ${patientId} found`);
        }
    });
};

const update = async (req: Request, res: Response) => {
    const patientId = req.params.id;
    const sqlQuery = `
        UPDATE
            patients
        SET
            name = ?,
            lastName = ?,
            birthDate = ?,
            sex = ?,
            email = ?,
            city = ?,
            passif = ?,
            address = ?,
            phone = ?,
            job = ?,
            doctor = ?
        WHERE
            id = ?
    `;
    const values = [
        req.body.name,
        req.body.lastName,
        req.body.birthDate,
        req.body.sex,
        req.body.email,
        req.body.city,
        req.body.passif,
        req.body.address,
        req.body.phone,
        req.body.job,
        req.body.doctor,
    ];

    db.query(sqlQuery, [...values, patientId], (err: any, data: any) => {
        if (err) {
            res.status(sc.METHOD_FAILURE).json({ message: 'Method fails' });
            logger.fail(req, res, err);
        } else if (data.affectedRows === 0) {
            res.status(sc.NOT_FOUND).json({ message: `Patient ${patientId} not found` });
            logger.fail(req, res, `Patient ${patientId} not found`);
        } else {
            res.status(sc.OK).json({ message: `Patient ${patientId} updated` });
            logger.success(req, res, `Patient ${patientId} updated`);
        }
    });
};

const addAppointment = async (req: Request, res: Response) => {
    const patientId = req.params.id;
    const sqlQuery = `
        UPDATE
            patients
        SET
            passif = JSON_ARRAY_APPEND(passif, "$.lastAppointments", ?)
        WHERE
            id = ?
    `;
    const values = [req.body.id];

    db.query(sqlQuery, [...values, patientId], (err: any, data: any) => {
        if (err) {
            res.status(sc.METHOD_FAILURE).json({ message: 'Method fails' });
            logger.fail(req, res, err);
        } else if (data.affectedRows === 0) {
            res.status(sc.NOT_FOUND).json({ message: `Patient ${patientId} not found` });
            logger.fail(req, res, `Patient ${patientId} not found`);
        } else {
            res.status(sc.OK).json({ message: `Appointment ${req.body.id} added to patient ${patientId}` });
            logger.success(req, res, `Appointment ${req.body.id} added to patient ${patientId}`);
        }
    });
};

const delete_ = async (req: Request, res: Response) => {
    const patientId = req.params.id;
    const sqlQuery = `
        DELETE 
        FROM
            patients
        WHERE
            id = ?
    `;

    db.query(sqlQuery, patientId, (err: any, data: any) => {
        if (err) {
            res.status(sc.METHOD_FAILURE).json({ message: 'Method fails' });
            logger.fail(req, res, err);
        } else if (data.affectedRows === 0) {
            res.status(sc.NOT_FOUND).json({ message: `Patient ${patientId} not found` });
            logger.fail(req, res, `Patient ${patientId} not found`);
        } else {
            res.status(sc.OK).json({ message: `Patient ${patientId} deleted` });
            logger.success(req, res, `Patient ${patientId} deleted`);
        }
    });
};

export default module.exports = {
    create,
    read,
    update,
    delete: delete_,
    addAppointment,
};
