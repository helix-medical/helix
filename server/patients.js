const express = require('express');
const router = express.Router();
const db = require('./db');

router.get('/', (req, res) => {
    const sqlQuery = `
    SELECT *
    FROM patients
    `;
    db.query(sqlQuery, (err, data) => {
        if (err) {
            console.log(err);
            return res.json(err);
        }
        return res.json(data);
    });
});

router.get('/:id/read', (req, res) => {
    const patientId = req.params.id;
    const sqlQuery = `
    SELECT *
    FROM patients
    WHERE id = ?
    `;
    db.query(sqlQuery, patientId, (err, data) => {
        if (err) {
            console.log(err);
            return res.json(err);
        }
        return res.json(data);
    });
});

router.post('/add', (req, res) => {
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

    // TODO: ADD A VALIDATOR HERE (USE MIDDLEWARE)

    db.query(sqlQuery, [values], (err, data) => {
        if (err) {
            console.log(err);
            return res.json(err);
        }
        return res.json(`Patient ${data.insertId} added`);
    });
});

router.delete('/:id/delete', (req, res) => {
    const patientId = req.params.id;
    const sqlQuery = `DELETE 
    FROM patients
    WHERE id = ?
    `;

    db.query(sqlQuery, patientId, (err, data) => {
        if (err) {
            console.log(err);
            return res.json(err);
        }
        return res.json(`Patient ${patientId} deleted`);
    });
});

router.put('/:id/update', (req, res) => {
    const patientId = req.params.id;
    const sqlQuery = 'UPDATE patients ' +
        'SET `name` = ?, `lastName` = ?, `birthDate` = ?, `sex` = ?, `email` = ?, `city` = ?, `nextApp` = ?, `passif` = ? ' +
        'WHERE id = ?';
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

    // TODO: ADD A VALIDATOR HERE (USE MIDDLEWARE)

    db.query(sqlQuery, [...values, patientId], (err, data) => {
        if (err) {
            console.log(err);
            return res.json(err);
        }
        return res.json(`Patient ${patientId} updated`);
    });
});

router.put('/:id/add_appointment/', (req, res) => {
    const patientId = req.params.id;
    const sqlQuery = 'UPDATE patients ' +
        'SET `passif` = JSON_ARRAY_APPEND(`passif`, "$.lastAppointments", ?) ' +
        'WHERE id = ?';
    const values = [
        req.body.id
    ];

    db.query(sqlQuery, [...values, patientId], (err, data) => {
        if (err) {
            console.log(err);
            return res.json(err);
        }
        return res.json(data);
    });
});

module.exports = router;