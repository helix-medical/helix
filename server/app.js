const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = 3001;

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: process.env.PASSWORD_DB,
    database: 'helix'
});

app.use(express.json());
app.use(cors());

app.get('/api', (req, res) => {
    res.send('<h1>Helix: A System for Patient Management [[API]]</h1>');
});

app.get('/api/patients', (req, res) => {
    const sqlQuery = 'SELECT * FROM patients';
    db.query(sqlQuery, (err, data) => {
        if (err) {
            console.log(err);
            return res.json(err);
        }
        return res.json(data);
    });
});

app.get('/api/patients/:id', (req, res) => {
    const patientId = req.params.id;
    const sqlQuery = 'SELECT * FROM patients WHERE id = ?';
    db.query(sqlQuery, patientId, (err, data) => {
        if (err) {
            console.log(err);
            return res.json(err);
        }
        return res.json(data);
    });
});

app.post('/api/patients/add', (req, res) => {
    const sqlQuery = 'INSERT INTO patients (`name`, `lastName`, `birthDate`, `sex`, `email`, `city`, `lastApp`, `nextApp`, `passif`) VALUES (?)';
    const values = [
        req.body.name,
        req.body.lastName,
        req.body.birthDate,
        req.body.sex,
        req.body.email,
        req.body.city,
        req.body.lastApp,
        req.body.nextApp,
        req.body.passif
    ];

    db.query(sqlQuery, [values], (err, data) => {
        if (err) {
            console.log(err);
            return res.json(err);
        }
        return res.json("New patient added");
    });
});

app.delete('/api/patients/:id', (req, res) => {
    const patientId = req.params.id;
    const sqlQuery = 'DELETE FROM patients WHERE id = ?';

    db.query(sqlQuery, patientId, (err, data) => {
        if (err) {
            console.log(err);
            return res.json(err);
        }
        return res.json("Patient deleted");
    })
});

app.put('/api/patients/:id', (req, res) => {
    const patientId = req.params.id;
    const sqlQuery = 'UPDATE patients SET `name` = ?, `lastName` = ?, `birthDate` = ?, `sex` = ?, `email` = ?, `city` = ?, `lastApp` = ?, `nextApp` = ? WHERE id = ?';
    const values = [
        req.body.name,
        req.body.lastName,
        req.body.birthDate,
        req.body.sex,
        req.body.email,
        req.body.city,
        req.body.lastApp,
        req.body.nextApp
    ];

    db.query(sqlQuery, [...values, patientId], (err, data) => {
        if (err) {
            console.log(err);
            return res.json(err);
        }
        return res.json("Patient updated");
    })
});

app.get('/api/appointments', (req, res) => {
    const sqlQuery = 'SELECT appointments.id, appointments.date, appointments.reasons, patients.name, patients.lastName, patients.sex FROM appointments INNER JOIN patients ON appointments.patientId = patients.id';
    db.query(sqlQuery, (err, data) => {
        if (err) {
            console.log(err);
            return res.json(err);
        }
        return res.json(data);
    });
});

app.get('/api/appointments/:id', (req, res) => {
    const appointmentId = req.params.id;
    const sqlQuery = 'SELECT * FROM appointments WHERE id = ?';
    db.query(sqlQuery, appointmentId, (err, data) => {
        if (err) {
            console.log(err);
            return res.json(err);
        }
        return res.json(data);
    });
});

app.get('/api/appointments/use/:id', (req, res) => {
    const appointmentId = req.params.id;
    const sqlQuery = 'SELECT appointments.id, appointments.date, appointments.reasons, appointments.anamnesis, appointments.conclusion, appointments.patientId, patients.name, patients.lastName, patients.email, patients.birthDate, patients.city, patients.sex, patients.passif FROM appointments INNER JOIN patients ON appointments.patientId = patients.id WHERE appointments.id = ?';
    db.query(sqlQuery, appointmentId, (err, data) => {
        if (err) {
            console.log(err);
            return res.json(err);
        }
        return res.json(data);
    });
});

app.post('/api/appointments/new', (req, res) => {
    const sqlQuery = 'INSERT INTO appointments (`patientId`, `date`, `reasons`, `anamnesis`, `conclusion`) VALUES (?)';
    const values = [
        req.body.patientId,
        req.body.date,
        req.body.reasons,
        req.body.anamnesis,
        req.body.conclusion
    ];

    db.query(sqlQuery, [values], (err, data) => {
        if (err) {
            console.log(err);
            return res.json(err);
        }
        return res.json(data.insertId);
    });
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});