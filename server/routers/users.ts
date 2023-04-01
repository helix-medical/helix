import { Router, Response, Request, NextFunction } from 'express';
const router: Router = Router();
import db from '../db';
import validate from '../validation/validator';
import logger from '../system/logger';
import sc from '../tools/statusCodes';

router.get('/', (req: Request, res: Response) => {
    logger.get(req.originalUrl, 'REQ');
    const sqlQuery = `
    SELECT *
    FROM users
    `;
    db.query(sqlQuery, (err: any, data: any) => {
        if (!err) {
            logger.get(req.originalUrl, 'OK', 'Return all users');
            return res.status(sc.OK).json(data);
        }
        logger.get(req.originalUrl, 'ERR', err);
        return res.status(sc.BAD_REQUEST).json(err);
    });
});

router.post('/add', (req: Request, res: Response) => {
    logger.post(req.originalUrl, 'REQ');
    const sqlQuery = `
    INSERT INTO users (username, password, role)
    VALUES (?)
    `;
    const values = [
        req.body.username,
        req.body.password,
        req.body.role,
    ];

    db.query(sqlQuery, [values], (err: any, data: { insertId: any }) => {
        if (!err) {
            logger.post(req.originalUrl, 'OK', `User ${data.insertId} created`);
            return res.status(sc.CREATED).json(`User ${data.insertId} created`);
        }
        logger.post(req.originalUrl, 'ERR', err);
        return res.status(sc.BAD_REQUEST).json(err);
    });
});


export default router;