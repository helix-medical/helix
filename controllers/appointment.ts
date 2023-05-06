import { Response, Request } from 'express';
import uuid from '../tools/uuid';
import queries from '../database/queries';

const create = async (req: Request, res: Response) => {
    let id = uuid();
    while (await queries.checkId(id, 'appointments', 'id')) id = uuid();
    const sqlQuery = `
        INSERT INTO
            appointments
                (id, patientId, event, kind, content, status)
            VALUES
                (?)
    `;
    const values = [
        id,
        req.body.patientId,
        req.body.event,
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
    ];

    await queries.push(req, res, sqlQuery, [values], { id, name: 'Appointment', verb: 'created' });
};

const read = async (req: Request, res: Response) => {
    const { id, view } = req.params;
    const sqlQuery = `
        SELECT
            app.id AS appID,
            e.start AS date,
            app.kind,
            ${
                view === 'view'
                    ? `app.content,
            a.amount,
            a.method,`
                    : ''
            }
            app.patientId,
            app.status,
            p.name AS pName,
            p.lastName AS pLastName,
            p.email,
            p.birthDate,
            p.city,
            p.sex,
            p.passif,
            u.name,
            u.lastName,
            p.address,
            p.phone,
            p.doctor,
            p.job
        FROM appointments app
            INNER JOIN patients p ON app.patientId = p.id
            INNER JOIN events e ON app.event = e.id
            INNER JOIN users u ON e.calendar = u.uid
            ${view === 'view' ? `INNER JOIN accounting a ON app.payment = a.uid` : ''}
        WHERE app.id = ?
    `;

    await queries.pull(req, res, sqlQuery, [id], { id, name: 'Appointment', verb: `returned for ${view}` });
};

const updateContent = async (req: Request, res: Response) => {
    const appointmentId = req.params.id;
    const sqlQuery = `
        UPDATE appointments
        SET content = ?, status = ? , payment = ?
        WHERE id = ?
    `;
    const values = [req.body.content, 'finished', req.body.payment];

    await queries.push(req, res, sqlQuery, [...values, appointmentId], {
        id: appointmentId,
        name: 'Appointment',
        verb: 'updated',
    });
};

const getFromEvent = async (req: Request, res: Response) => {
    const sqlQuery = `
        SELECT
            a.id AS appID,
            p.id AS patientID,
            p.name AS patientName,
            p.lastName AS patientLastName,
            p.email,
            p.phone,
            p.birthDate,
            u.name AS practitionerName,
            u.lastName AS practitionerLastName,
            a.kind,
            a.status
        FROM events e
            INNER JOIN appointments a ON e.appID = a.id
            INNER JOIN users u ON e.calendar = u.uid
            INNER JOIN patients p ON a.patientId = p.id
        WHERE e.id = ?
    `;
    const values = [req.params.id];

    await queries.pull(req, res, sqlQuery, values, { id: req.params.id, name: 'Appointment', verb: 'returned' });
};

export default module.exports = {
    create,
    updateContent,
    read,
    getFromEvent,
};
