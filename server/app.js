const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
require('dotenv').config();

// Create connection
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
    res.send('<h1>Helix: CRUD APP</h1><h2>Server</h2>');
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

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});