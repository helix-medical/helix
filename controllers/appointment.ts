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
        'INSERT INTO appointments ' +
        '(`id`, `patientId`, `date`, `kind`, `content`, `status`, `practitioner`) VALUES (?)';
    const values = [
        id,
        req.body.patientId,
        req.body.date,
        req.body.kind,
        JSON.stringify({
            reasons: '',
            symptoms: '',
            knownDiseases: '',
            knownMedications: '',
            diagnosis: '',
            treatment: '',
            observations: '',
        }),
        'pending',
        req.body.practitioner,
    ];

    db.query(sqlQuery, [values], (err: any, data: { insertId: any }) => {
        if (err) {
            logger.post(req.originalUrl, 'ERR', err);
            return res.status(sc.METHOD_FAILURE).json({ message: 'Method fails' });
        }
        logger.post(req.originalUrl, 'OK', `Appointment ${id} created`);
        return res.status(sc.OK).json({ id, message: `Appointment ${id} created` });
    });
};

const update = async (req: Request, res: Response) => {
    logger.put(req.originalUrl, 'REQ');
    const appointmentId = req.params.id;
    const sqlQuery = 'UPDATE appointments SET `content` = ?, `status` = ? , `payment` = ? WHERE id = ?';
    const values = [req.body.content, 'finished', req.body.payment];

    db.query(sqlQuery, [...values, appointmentId], (err: any, data: any) => {
        if (err) {
            logger.put(req.originalUrl, 'ERR', err);
            return res.status(sc.METHOD_FAILURE).json({ message: 'Method fails' });
        }
        logger.put(req.originalUrl, 'OK', `Appointment ${appointmentId} updated`);
        return res.status(sc.OK).json({ message: `Appointment ${appointmentId} updated` });
    });
};

const getForView = async (req: Request, res: Response) => {
    logger.get(req.originalUrl, 'REQ');
    const appointmentId = req.params.id;
    const sqlQuery =
        'SELECT app.id AS appID, app.date, app.kind, app.content, a.amount, a.method, app.`patientId`, app.status, p.name AS pName, p.`lastName` AS pLastName, p.email, p.`birthDate`, p.city, p.sex, p.passif, u.name, u.`lastName` ' +
        'FROM appointments app ' +
        'INNER JOIN patients p  ON app.`patientId` = p.id ' +
        'INNER JOIN accounting a ON app.payment = a.uid ' +
        'INNER JOIN users u ON app.practitioner = u.uid ' +
        'WHERE app.id = ?';
    db.query(sqlQuery, appointmentId, (err: any, data: any) => {
        if (err) {
            logger.get(req.originalUrl, 'ERR', err);
            return res.status(sc.BAD_REQUEST).json({ message: 'Bad request' });
        }
        logger.get(req.originalUrl, 'OK', `Return appointment ${appointmentId}`);
        return res.status(sc.OK).json(data);
    });
};

const getForEdit = async (req: Request, res: Response) => {
    logger.get(req.originalUrl, 'REQ');
    const appointmentId = req.params.id;
    const sqlQuery =
        'SELECT app.id AS appID, app.date, app.kind, app.`patientId`, app.status, p.name AS pName, p.`lastName` AS pLastName, p.email, p.`birthDate`, p.city, p.sex, p.passif, u.name, u.`lastName` ' +
        'FROM appointments app ' +
        'INNER JOIN patients p ON app.`patientId` = p.id ' +
        'INNER JOIN users u ON app.practitioner = u.uid ' +
        'WHERE app.`id` = ?';
    db.query(sqlQuery, appointmentId, (err: any, data: any) => {
        if (err) {
            logger.get(req.originalUrl, 'ERR', err);
            return res.status(sc.BAD_REQUEST).json({ message: 'Bad request' });
        }
        logger.get(req.originalUrl, 'OK', `Return appointment ${appointmentId}`);
        return res.status(sc.OK).json(data);
    });
};

/**
const read = async (req: Request, res: Response) => {
    logger.get(req.originalUrl, 'REQ');
    const appointmentId = req.params.id;
    const sqlQuery = `
    SELECT *
    FROM appointments
    WHERE id = ?
    `;
    db.query(sqlQuery, appointmentId, (err: any, data: any) => {
        if (err) {
            logger.get(req.originalUrl, 'ERR', err);
            return res.status(sc.BAD_REQUEST).json(err);
        }
        logger.get(req.originalUrl, 'OK', `Return appointment ${appointmentId}`);
        return res.status(sc.OK).json(data);
    });
};
*/

export default module.exports = {
    create,
    update,
    getForView,
    getForEdit,
    // read,
};
