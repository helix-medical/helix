import { Response, Request } from 'express';
import db from '../database/config';
import logger from '../system/logger';
import sc from '../tools/statusCodes';
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

    db.query(sqlQuery, [values], (err: any, data: any) => {
        if (err) {
            res.status(sc.BAD_REQUEST).json({ message: `Bad request` });
            logger.fail(req, res, err);
        } else if (data.affectedRows === 0) {
            res.status(sc.INTERNAL_SERVER_ERROR).json({ message: `Fail on create event` });
            logger.fail(req, res, `Fail on create event`);
        } else {
            res.status(sc.CREATED).json({ id: id, message: `Event ${id} created` });
            logger.success(req, res, `Event ${id} created`);
        }
    });
};

const getEvents = async (req: Request, res: Response) => {
    const sqlQuery = `SELECT * FROM events`;
    db.query(sqlQuery, (err: any, data: any) => {
        if (err) {
            res.status(sc.BAD_REQUEST).json({ message: `Bad request` });
            logger.fail(req, res, err);
        } else if (data.length === 0) {
            res.status(sc.NOT_FOUND).json({ message: `Events not found` });
            logger.fail(req, res, `Events not found`);
        } else {
            res.status(sc.OK).json(data);
            logger.success(req, res, `Return events`);
        }
    });
};

export default {
    create,
    getEvents,
};
