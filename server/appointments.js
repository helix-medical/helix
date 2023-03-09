const express = require('express');
const router = express.Router();
const db = require('./db');

router.get('/', (req, res) => {
    const sqlQuery = `
    SELECT appointments.id, appointments.date, appointments.reasons, appointments.status, patients.name, patients.lastName, patients.sex 
    FROM appointments INNER JOIN patients ON appointments.patientId = patients.id
    `;
    db.query(sqlQuery, (err, data) => {
        if (err) {
            console.log(err);
            return res.json(err);
        }
        return res.json(data);
    });
});

router.get('/read/:id', (req, res) => {
    const appointmentId = req.params.id;
    const sqlQuery = `
    SELECT *
    FROM appointments
    WHERE id = ?
    `;
    db.query(sqlQuery, appointmentId, (err, data) => {
        if (err) {
            console.log(err);
            return res.json(err);
        }
        return res.json(data);
    });
});

router.get('/appointment/:id', (req, res) => {
    const appointmentId = req.params.id;
    const sqlQuery = `
    SELECT appointments.id, appointments.date, appointments.reasons, appointments.anamnesis, appointments.conclusion, appointments.patientId, appointments.status, patients.name, patients.lastName, patients.email, patients.birthDate, patients.city, patients.sex, patients.passif 
    FROM appointments INNER JOIN patients ON appointments.patientId = patients.id
    WHERE appointments.id = ?
    `;
    db.query(sqlQuery, appointmentId, (err, data) => {
        if (err) {
            console.log(err);
            return res.json(err);
        }
        return res.json(data);
    });
});

router.post('/new', (req, res) => {
    const sqlQuery = 'INSERT INTO appointments ' +
        '(`patientId`, `date`, `reasons`, `anamnesis`, `conclusion`, `status`) VALUES (?)';
    const values = [
        req.body.patientId,
        req.body.date,
        req.body.reasons,
        req.body.anamnesis,
        req.body.conclusion,
        "pending"
    ];

    // TODO: ADD A VALIDATOR HERE

    db.query(sqlQuery, [values], (err, data) => {
        if (err) {
            console.log(err);
            return res.json(err);
        }
        return res.json(data.insertId);
    });
});

router.put('/update/:id', (req, res) => {
    const appointmentId = req.params.id;
    const sqlQuery = 'UPDATE appointments ' +
        'SET `anamnesis` = ?, `conclusion` = ?, `status` = ? ' +
        'WHERE id = ?';
    const values = [
        req.body.anamnesis,
        req.body.conclusion,
        "finished"
    ];

    // TODO: ADD A VALIDATOR HERE

    db.query(sqlQuery, [...values, appointmentId], (err, data) => {
        if (err) {
            console.log(err);
            return res.json(err);
        }
        return res.json(`Appointment ${appointmentId} updated`);
    });
});

module.exports = router;