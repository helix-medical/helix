import { Response, Request } from 'express';
import uuid from '../tools/uuid';
import queries from '../database/queries';

const create = async (req: Request, res: Response) => {
    let id = uuid();
    while (await queries.checkId(id, `events`, 'id')) id = uuid();
    const sqlQuery = `
        INSERT INTO
            events 
                (id, title, start, end, calendar, appID)
            VALUES
                (?)
    `;
    const values = [id, req.body.title, req.body.start, req.body.end, req.body.calendar, req.body.appID ?? ''];
    await queries.push(req, res, sqlQuery, [values], { id, name: 'Event', verb: 'created' });
};

const getEvents = async (req: Request, res: Response) => {
    const sqlQuery = `SELECT * FROM events`;
    await queries.pull(req, res, sqlQuery, [], { id: `all`, name: 'Events', verb: 'returned' });
};

const updateDate = async (req: Request, res: Response) => {
    const event = req.params.id;
    const sqlQuery = `
        UPDATE
            events
        SET
            date = ?
        WHERE
            id = ?
    `;
    const values = [req.body.date];
    await queries.push(req, res, sqlQuery, [...values, event], { id: event, name: 'Event', verb: 'updated date' });
};

const updateCalendar = async (req: Request, res: Response) => {
    const event = req.params.id;
    const sqlQuery = `
        UPDATE
            events
        SET
            calendar = ?
        WHERE
            id = ?
    `;
    const values = [req.body.calendar];
    await queries.push(req, res, sqlQuery, [...values, event], { id: event, name: 'Event', verb: 'updated calendar' });
};

const addAppointment = async (req: Request, res: Response) => {
    const event = req.params.id;
    const sqlQuery = `
        UPDATE
            events
        SET
            appID = ?
        WHERE
            id = ?
    `;
    const values = [req.body.appId];
    await queries.push(req, res, sqlQuery, [...values, event], {
        id: event,
        name: 'Event',
        verb: 'updated appointment',
    });
};

const delete_ = async (req: Request, res: Response) => {
    const event = req.params.id;
    const sqlQuery = `
        DELETE
        FROM
            events
        WHERE
            id = ?
    `;
    await queries.push(req, res, sqlQuery, [event], { id: event, name: 'Event', verb: 'deleted' });
};

export default {
    create,
    getEvents,
    updateDate,
    updateCalendar,
    addAppointment,
    delete: delete_,
};
