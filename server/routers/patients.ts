import { Router, Response, Request, NextFunction } from 'express';
const router: Router = Router();
import db from '../db';
import validate from '../validation/validator';

router.get('/', (req: Request, res: Response) => {
    const sqlQuery = `
    SELECT *
    FROM patients
    `;
    db.query(sqlQuery, (err: any, data: any) => {
        if (err) {
            console.log(err);
            return res.json(err);
        }
        return res.json(data);
    });
});

router.get('/:id/read', (req: Request, res: Response) => {
    const patientId = req.params.id;
    const sqlQuery = `
    SELECT *
    FROM patients
    WHERE id = ?
    `;
    db.query(sqlQuery, patientId, (err: any, data: any) => {
        if (err) {
            console.log(err);
            return res.json(err);
        }
        return res.json(data);
    });
});

router.use('/add', (req: Request, res: Response, next: NextFunction) => {
    const isValid = validate.patientCreate(req.body);
    if (!isValid) {
        return res.json(validate.patientCreate.errors);
    }
    next();
});

router.post('/add', (req: Request, res: Response) => {
    const sqlQuery = 'INSERT ' +
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
        req.body.passif
    ];

    db.query(sqlQuery, [values], (err: any, data: { insertId: any; }) => {
        if (err) {
            console.log(err);
            return res.json(err);
        }
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
            console.log(err);
            return res.json(err);
        }
        return res.json(`Patient ${patientId} deleted`);
    });
});

router.use('/:id/update', (req: Request, res: Response, next: NextFunction) => {
    const isValid = validate.patientUpdate(req.body);
    if (!isValid) {
        return res.json(validate.patientUpdate.errors);
    }
    next();
});

router.put('/:id/update', (req: Request, res: Response) => {
    const patientId = req.params.id;
    const sqlQuery = 'UPDATE patients ' +
        'SET `name` = ?, `lastName` = ?, `birthDate` = ?, `sex` = ?, `email` = ?, `city` = ?, `passif` = ? ' +
        'WHERE id = ?';
    const values = [
        req.body.name,
        req.body.lastName,
        req.body.birthDate,
        req.body.sex,
        req.body.email,
        req.body.city,
        req.body.passif
    ];

    db.query(sqlQuery, [...values, patientId], (err: any, data: any) => {
        if (err) {
            console.log(err);
            return res.json(err);
        }
        return res.json(`Patient ${patientId} updated`);
    });
});

router.put('/:id/add_appointment/', (req: Request, res: Response) => {
    const patientId = req.params.id;
    const sqlQuery = 'UPDATE patients ' +
        'SET `passif` = JSON_ARRAY_APPEND(`passif`, "$.lastAppointments", ?) ' +
        'WHERE id = ?';
    const values = [
        req.body.id
    ];

    db.query(sqlQuery, [...values, patientId], (err: any, data: any) => {
        if (err) {
            console.log(err);
            return res.json(err);
        }
        return res.json(data);
    });
});

export default router;