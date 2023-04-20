import { Response, Request, NextFunction } from 'express';
import validate from '../validation/validator';
import logger from '../tools/logger';
import sc from '../tools/status-codes';
import db from '../database/config';

const create = async (req: Request, res: Response, next: NextFunction) => {
    const isValid = validate.eventCreate(req.body);
    if (!isValid) {
        res.status(sc.NOT_ACCEPTABLE).json(validate.eventCreate.errors);
        logger.fail(req, res, 'Invalid request body');
    } else {
        logger.success(req, res, 'Valid request body');
        next();
    }
};

const addAppointment = async (req: Request, res: Response, next: NextFunction) => {
    const isValid = validate.addAppointment(req.body);
    if (!isValid) {
        res.status(sc.NOT_ACCEPTABLE).json(validate.addAppointment.errors);
        logger.fail(req, res, 'Invalid request body');
    } else {
        logger.success(req, res, 'Valid request body');
        const patientId = req.body.patientId;
        const sqlQuery = `
            UPDATE
                patients
            SET
                passif = JSON_ARRAY_APPEND(passif, "$.lastAppointments", ?)
            WHERE
                id = ?
        `;
        const values = [req.body.appId];

        db.query(sqlQuery, [...values, patientId], (err: any, data: any) => {
            if (err) {
                res.status(sc.METHOD_FAILURE).json({ message: 'Method fails' });
                logger.fail(req, res, err);
            } else if (data.affectedRows === 0) {
                res.status(sc.NOT_FOUND).json({ message: `Patient ${patientId} not found` });
                logger.fail(req, res, `Patient ${patientId} not found`);
            } else {
                logger.success(req, res, `Appointment ${req.body.id} added to patient ${patientId}`);
                next();
            }
        });
    }
};

export default {
    create,
    addAppointment,
};
