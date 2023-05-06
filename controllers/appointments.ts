import { Response, Request } from 'express';
import moment from 'moment';
import queries from '../database/queries';

const readAll = async (req: Request, res: Response) => {
    const sqlQuery = `
        SELECT
            app.id,
            e.start AS date,
            app.kind,
            app.status,
            p.name,
            p.lastName,
            p.sex
        FROM
            appointments app
            INNER JOIN
                patients p
                    ON app.patientId = p.id
            INNER JOIN
                events e
                    ON app.event = e.id
    `;
    let addOn = '';
    if (req.params.period === 'past') {
        addOn = `WHERE e.start < '${moment().format('YYYY-MM-DD HH:mm')}'`;
    } else if (req.params.period === 'upcoming') {
        addOn = `WHERE e.start > '${moment().format('YYYY-MM-DD HH:mm')}'`;
    }

    await queries.pull(req, res, sqlQuery + addOn + 'ORDER BY e.start ASC', [], {
        id: req.params.period,
        name: 'Appointments',
        verb: 'returned',
    });
};

const getByPatient = async (req: Request, res: Response) => {
    const sqlQuery = `
        SELECT
            app.id AS appID,
            app.kind,
            app.status,
            e.start,
            e.end,
            u.name AS practitionerName,
            u.lastName AS practitionerLastName,
            app.content,
            app.payment,
            acc.amount,
            acc.method
        FROM appointments app
            INNER JOIN events e ON app.id = e.appID
            INNER JOIN users u ON e.calendar = u.uid
            LEFT JOIN accounting acc ON app.payment = acc.uid
        WHERE patientId = ?
        ORDER BY e.start DESC;
    `;

    await queries.pull(req, res, sqlQuery, [req.params.id], {
        id: req.params.id,
        name: 'Appointment',
        verb: 'returned',
    });
};

export default module.exports = {
    readAll,
    getByPatient,
};
