import { Response, Request } from 'express';
import uuid from '../tools/uuid';
import queries from '../database/queries';

const create = async (req: Request, res: Response) => {
    let id = uuid();
    while (await queries.checkId(id, `events`, 'id')) id = uuid();
    const sqlQuery = `
        INSERT INTO events 
            (id, title, start, end, calendar, appID)
        VALUES (?)
    `;
    const values = [id, req.body.title, req.body.start, req.body.end, req.body.calendar, req.body.appID ?? ''];
    await queries.push(req, res, sqlQuery, [values], { id, name: 'Event', verb: 'created' });
};

const getEvents = async (req: Request, res: Response) => {
    const sqlQuery = `SELECT * FROM events`;
    await queries.pull(req, res, sqlQuery, [], { id: `all`, name: 'Events', verb: 'returned' });
};

const getByCalendar = async (req: Request, res: Response) => {
    const calendar = req.params.calendar;
    const sqlQuery = `
        SELECT *
        FROM events
        WHERE calendar = ?
    `;
    await queries.pull(req, res, sqlQuery, [calendar], { id: calendar, name: 'Events', verb: 'returned' });
};

const updateDate = async (req: Request, res: Response) => {
    const event = req.params.id;
    const sqlQuery = `
        UPDATE events
        SET start = ?, end = ?
        WHERE id = ?
    `;
    const values = [req.body.start, req.body.end];
    await queries.push(req, res, sqlQuery, [...values, event], { id: event, name: 'Event', verb: 'updated date' });
};

const updateCalendar = async (req: Request, res: Response) => {
    const event = req.params.id;
    const sqlQuery = `
        UPDATE events
        SET calendar = ?
        WHERE id = ?
    `;
    const values = [req.body.calendar];
    await queries.push(req, res, sqlQuery, [...values, event], { id: event, name: 'Event', verb: 'updated calendar' });
};

const addAppointment = async (req: Request, res: Response) => {
    const event = req.params.id;
    const sqlQuery = `
        UPDATE events
        SET appID = ?
        WHERE id = ?
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
        FROM events
        WHERE id = ?
    `;
    await queries.push(req, res, sqlQuery, [event], { id: event, name: 'Event', verb: 'deleted' });
};

const getNextAppointment = async (req: Request, res: Response) => {
    const sqlQuery = `
        SELECT e.id, e.calendar, e.start, e.end, e.title, e.appID
        FROM events e
            INNER JOIN appointments ap ON e.appID = ap.id
        WHERE
            start > ?
            AND ap.status = 'pending'
        ORDER BY start ASC
        LIMIT 1;
    `;
    await queries.pull(req, res, sqlQuery, [req.params.date], { id: 'next', name: 'Event', verb: 'returned' });
};

export default {
    addAppointment,
    create,
    delete: delete_,
    getByCalendar,
    getEvents,
    getNextAppointment,
    updateCalendar,
    updateDate,
};
