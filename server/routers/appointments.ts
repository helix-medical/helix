import { Router, Response, Request, NextFunction } from 'express';
const router: Router = Router();
import db from '../db';
import validate from '../validation/validator';
import logger from '../system/logger';
import sc from '../tools/statusCodes';

router.get('/', (req: Request, res: Response) => {
    logger.get(req.originalUrl, 'REQ');
    const sqlQuery = `
    SELECT appointments.id, appointments.date, appointments.reasons, appointments.status, patients.name, patients.lastName, patients.sex 
    FROM appointments INNER JOIN patients ON appointments.patientId = patients.id
    `;
    db.query(sqlQuery, (err: any, data: any) => {
        if (err) {
            logger.get(req.originalUrl, 'ERR', err);
            return res.status(sc.BAD_REQUEST).json(err);
        }
        logger.get(req.originalUrl, 'OK', 'Return all appointments');
        return res.status(sc.OK).json(data);
    });
});

router.get('/:id/read', (req: Request, res: Response) => {
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
});

router.get('/:id/appointment', (req: Request, res: Response) => {
    logger.get(req.originalUrl, 'REQ');
    const appointmentId = req.params.id;
    const sqlQuery = `
    SELECT appointments.id, appointments.date, appointments.reasons, appointments.anamnesis, appointments.conclusion, appointments.patientId, appointments.status, patients.name, patients.lastName, patients.email, patients.birthDate, patients.city, patients.sex, patients.passif 
    FROM appointments INNER JOIN patients ON appointments.patientId = patients.id
    WHERE appointments.id = ?
    `;
    db.query(sqlQuery, appointmentId, (err: any, data: any) => {
        if (err) {
            logger.get(req.originalUrl, 'ERR', err);
            return res.status(sc.BAD_REQUEST).json(err);
        }
        logger.get(req.originalUrl, 'OK', `Return appointment ${appointmentId}`);
        return res.status(sc.OK).json(data);
    });
});

router.use('/new', (req: Request, res: Response, next: NextFunction) => {
    logger.use(req.originalUrl, 'REQ');
    const isValid = validate.appointmentCreate(req.body);
    if (!isValid) {
        logger.use(req.originalUrl, 'ERR', 'Invalid request body');
        return res.status(sc.NOT_ACCEPTABLE).json(validate.appointmentCreate.errors);
    }
    logger.use(req.originalUrl, 'OK', 'Valid request body');
    next();
});

router.post('/new', (req: Request, res: Response) => {
    logger.post(req.originalUrl, 'REQ');
    const sqlQuery =
        'INSERT INTO appointments ' +
        '(`patientId`, `date`, `reasons`, `anamnesis`, `conclusion`, `status`) VALUES (?)';
    const values = [
        req.body.patientId,
        req.body.date,
        req.body.reasons,
        req.body.anamnesis,
        req.body.conclusion,
        'pending',
    ];

    db.query(sqlQuery, [values], (err: any, data: { insertId: any }) => {
        if (err) {
            logger.post(req.originalUrl, 'ERR', err);
            return res.status(sc.METHOD_FAILURE).json(err);
        }
        logger.post(req.originalUrl, 'OK', `Appointment ${data.insertId} created`);
        return res.status(sc.OK).json(data.insertId);
    });
});

router.use('/:id/update', (req: Request, res: Response, next: NextFunction) => {
    logger.use(req.originalUrl, 'REQ');
    const isValid = validate.appointmentUpdate(req.body);
    if (!isValid) {
        logger.use(req.originalUrl, 'ERR', 'Invalid request body');
        return res.status(sc.NOT_ACCEPTABLE).json(validate.appointmentUpdate.errors);
    }
    logger.use(req.originalUrl, 'OK', 'Valid request body');
    next();
});

router.put('/:id/update', (req: Request, res: Response) => {
    logger.put(req.originalUrl, 'REQ');
    const appointmentId = req.params.id;
    const sqlQuery = 'UPDATE appointments ' + 'SET `anamnesis` = ?, `conclusion` = ?, `status` = ? ' + 'WHERE id = ?';
    const values = [req.body.anamnesis, req.body.conclusion, 'finished'];

    db.query(sqlQuery, [...values, appointmentId], (err: any, data: any) => {
        if (err) {
            logger.put(req.originalUrl, 'ERR', err);
            return res.status(sc.METHOD_FAILURE).json(err);
        }
        logger.put(req.originalUrl, 'OK', `Appointment ${appointmentId} updated`);
        return res.status(sc.OK).json(`Appointment ${appointmentId} updated`);
    });
});

export default router;
