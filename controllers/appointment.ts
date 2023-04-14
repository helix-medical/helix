import { Response, Request } from 'express';
import db from '../database/config';
import sc from '../tools/statusCodes';
import uuid from '../tools/uuid';
import queries from '../database/queries';
import logger from '../system/logger';

const create = async (req: Request, res: Response) => {
    let id = uuid();
    while (await queries.checkId(id, 'appointments', 'id')) id = uuid();
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
            res.status(sc.METHOD_FAILURE).json({ message: 'Method fails' });
            logger.fail(req, res, err);
        } else {
            res.status(sc.OK).json({ id, message: `Appointment ${id} created` });
            logger.success(req, res, `Appointment ${id} created`);
        }
    });
};

const update = async (req: Request, res: Response) => {
    const appointmentId = req.params.id;
    const sqlQuery = 'UPDATE appointments SET `content` = ?, `status` = ? , `payment` = ? WHERE id = ?';
    const values = [req.body.content, 'finished', req.body.payment];

    db.query(sqlQuery, [...values, appointmentId], (err: any, data: any) => {
        if (err) {
            res.status(sc.METHOD_FAILURE).json({ message: 'Method fails' });
            logger.fail(req, res, err);
        } else if (data.affectedRows === 0) {
            res.status(sc.NOT_FOUND).json({ message: 'Appointment not found' });
            logger.fail(req, res, `Appointment ${appointmentId} not found`);
        } else {
            res.status(sc.OK).json({ message: `Appointment ${appointmentId} updated` });
            logger.success(req, res, `Appointment ${appointmentId} updated`);
        }
    });
};

const getForView = async (req: Request, res: Response) => {
    const appointmentId = req.params.id;
    const sqlQuery =
        'SELECT app.id AS appID, app.date, app.kind, app.content, a.amount, a.method, app.`patientId`, app.status, p.name AS pName, p.`lastName` AS pLastName, p.email, p.`birthDate`, p.city, p.sex, p.passif, u.name, u.`lastName`, p.address, p.phone, p.doctor, p.job ' +
        'FROM appointments app ' +
        'INNER JOIN patients p  ON app.`patientId` = p.id ' +
        'INNER JOIN accounting a ON app.payment = a.uid ' +
        'INNER JOIN users u ON app.practitioner = u.uid ' +
        'WHERE app.id = ?';
    db.query(sqlQuery, appointmentId, (err: any, data: any) => {
        if (err) {
            res.status(sc.BAD_REQUEST).json({ message: 'Bad request' });
            logger.fail(req, res, err);
        } else if (data.length === 0) {
            res.status(sc.NOT_FOUND).json({ message: 'Appointment not found' });
            logger.fail(req, res, `Appointment ${appointmentId} not found`);
        } else {
            res.status(sc.OK).json(data);
            logger.success(req, res, `Return appointment ${appointmentId}`);
        }
    });
};

const getForEdit = async (req: Request, res: Response) => {
    const appointmentId = req.params.id;
    const sqlQuery =
        'SELECT app.id AS appID, app.date, app.kind, app.`patientId`, app.status, p.name AS pName, p.`lastName` AS pLastName, p.email, p.`birthDate`, p.city, p.sex, p.passif, u.name, u.`lastName`, p.address, p.phone, p.doctor, p.job ' +
        'FROM appointments app ' +
        'INNER JOIN patients p ON app.`patientId` = p.id ' +
        'INNER JOIN users u ON app.practitioner = u.uid ' +
        'WHERE app.`id` = ?';
    db.query(sqlQuery, appointmentId, (err: any, data: any) => {
        if (err) {
            res.status(sc.BAD_REQUEST).json({ message: 'Bad request' });
            logger.fail(req, res, err);
        } else if (data.length === 0) {
            res.status(sc.NOT_FOUND).json({ message: 'Appointment not found' });
            logger.fail(req, res, `Appointment ${appointmentId} not found`);
        } else {
            res.status(sc.OK).json(data);
            logger.success(req, res, `Return appointment ${appointmentId}`);
        }
    });
};

export default module.exports = {
    create,
    update,
    getForView,
    getForEdit,
};
