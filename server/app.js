const express = require('express');
const cors = require('cors');
require('dotenv').config();
const patients = require('./patients');
const appointments = require('./appointments');

const app = express();
const port = process.env.PORT_API;

app.use(express.json());
app.use(cors());

app.get('/api', (req, res) => {
    res.send('<h1>Helix: A System for Patient Management [[API]]</h1>');
});

app.use('/api/patients', patients);

app.use('/api/appointments', appointments);

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});