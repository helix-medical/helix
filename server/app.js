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

app.get('/', (req, res) => {
    res.send('<h1>Helix: A System for Patient Management</h1>');
});

app.get('/patients', (req, res) => {
    const sqlQuery = 'SELECT * FROM patients';
    db.query(sqlQuery, (err, data) => {
        if (err) {
            console.log(err);
            return res.json(err);
        }
        return res.json(data);
    });
});

app.post('/patients', (req, res) => {
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

app.delete('/patients/:id', (req, res) => {
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

app.put('/patients/:id', (req, res) => {
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

app.get('/appointments', (req, res) => {
    const sqlQuery = 'SELECT * FROM appointments';
    db.query(sqlQuery, (err, data) => {
        if (err) {
            console.log(err);
            return res.json(err);
        }
        return res.json(data);
    });
});

app.post('/appointments', (req, res) => {
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
        console.log("New appointment added");
        return res.json("New appointment added");
    });
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});