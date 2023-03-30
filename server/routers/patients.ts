import { Router, Response, Request, NextFunction } from 'express';
const router: Router = Router();
import db from '../db';
import validate from '../validation/validator';
import logger from '../logger';

router.get('/', (req: Request, res: Response) => {
    logger.get(req.originalUrl);
    const sqlQuery = `
    SELECT *
    FROM patients
    `;
    db.query(sqlQuery, (err: any, data: any) => {
        if (!err) {
            logger.success('Patients found');
            return res.json(data);
        }

        if (err.code === 'ER_NO_SUCH_TABLE') {
            err.sqlState =
                'No patients table in database. Please contact your administrator.';
            err.sql = 'Error while getting patients list';
        }

        logger.err(err);
        return res.status(404).json(err);
    });
});

router.get('/:id/read', (req: Request, res: Response) => {
    logger.get(req.originalUrl);
    const patientId = req.params.id;
    const sqlQuery = `
    SELECT *
    FROM patients
    WHERE id = ?
    `;
    db.query(sqlQuery, patientId, (err: any, data: any) => {
        if (!err) {
            if (data.length === 0) {
                logger.err(`Patient ${patientId} not found`);
                return res.status(404).json(`Patient ${patientId} not found`);
            }

            logger.success(`Patient ${patientId} found`);
            return res.json(data);
        }

        logger.err(err);
        return res.json(err);
    });
});

router.use('/add', (req: Request, res: Response, next: NextFunction) => {
    logger.use(req.originalUrl);
    const isValid = validate.patientCreate(req.body);
    if (!isValid) {
        // LOG HERE
        return res.json(validate.patientCreate.errors);
    }
    logger.use('VERIFIED');
    next();
});

router.post('/add', (req: Request, res: Response) => {
    logger.post(req.originalUrl);
    const sqlQuery =
        'INSERT ' +
        'INTO patients ' +
        '(`name`, `lastName`, `birthDate`, `sex`, `email`, `city`, `nextApp`, `passif`) VALUES (?)';
    const values = [
        req.body.name,
        req.body.lastName,
        req.body.birthDate,
        req.body.sex,
        req.body.email,
        req.body.city,
        req.body.nextApp,
        req.body.passif,
    ];

    db.query(sqlQuery, [values], (err: any, data: { insertId: any }) => {
        if (err) {
            logger.err(err);
            return res.json(err);
        }
        logger.success(`Patient ${data.insertId} added`);
        return res.json(`Patient ${data.insertId} added`);
    });
});

router.delete('/:id/delete', (req: Request, res: Response) => {
    const patientId = req.params.id;
    const sqlQuery = `DELETE 
    FROM patients
    WHERE id = ?
    `;

    db.query(sqlQuery, patientId, (err: any, data: any) => {
        if (err) {
            logger.err(err);
            return res.json(err);
        }
        logger.success(`Patient ${patientId} deleted`);
        return res.json(`Patient ${patientId} deleted`);
    });
});

router.use('/:id/update', (req: Request, res: Response, next: NextFunction) => {
    logger.use(req.originalUrl);
    const isValid = validate.patientUpdate(req.body);
    if (!isValid) {
        return res.json(validate.patientUpdate.errors);
    }
    logger.use('VERIFIED');
    next();
});

router.put('/:id/update', (req: Request, res: Response) => {
    logger.put(req.originalUrl);
    const patientId = req.params.id;
    const sqlQuery =
        'UPDATE patients ' +
        'SET `name` = ?, `lastName` = ?, `birthDate` = ?, `sex` = ?, `email` = ?, `city` = ?, `passif` = ? ' +
        'WHERE id = ?';
    const values = [
        req.body.name,
        req.body.lastName,
        req.body.birthDate,
        req.body.sex,
        req.body.email,
        req.body.city,
        req.body.passif,
    ];

    db.query(sqlQuery, [...values, patientId], (err: any, data: any) => {
        if (err) {
            logger.err(err);
            return res.json(err);
        }
        logger.success(`Patient ${patientId} updated`);
        return res.json(`Patient ${patientId} updated`);
    });
});

router.put('/:id/add_appointment/', (req: Request, res: Response) => {
    logger.put(req.originalUrl);
    const patientId = req.params.id;
    const sqlQuery =
        'UPDATE patients ' +
        'SET `passif` = JSON_ARRAY_APPEND(`passif`, "$.lastAppointments", ?) ' +
        'WHERE id = ?';
    const values = [req.body.id];

    db.query(sqlQuery, [...values, patientId], (err: any, data: any) => {
        if (err) {
            logger.err(err);
            return res.json(err);
        }
        logger.success(`Appointment ${req.body.id} added to patient ${patientId}`);
        return res.json(data);
    });
});

export default router;
