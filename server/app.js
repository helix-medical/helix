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
app.use(cors())

app.get('/', (req, res) => {
    res.send('<h1>Helix: CRUD APP [[SERVER]]</h1>');
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
    const sqlQuery = 'INSERT INTO patients (`name`, `lastName`, `birthDate`, `sex`) VALUES (?)';
    const values = [
        req.body.name,
        req.body.lastName,
        req.body.birthDate,
        req.body.sex
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
    const sqlQuery = 'UPDATE patients SET `name` = ?, `lastName` = ?, `birthDate` = ?, `sex` = ? WHERE id = ?';
    const values = [
        req.body.name,
        req.body.lastName,
        req.body.birthDate,
        req.body.sex 
    ];

    db.query(sqlQuery, [...values, patientId], (err, data) => {
        if (err) {
            console.log(err);
            return res.json(err);
        }
        return res.json("Patient updated");
    })
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});