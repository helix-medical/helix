const express = require('express');
const cors = require('cors');
require('dotenv').config();
const patients = require('./routers/patients');
const appointments = require('./routers/appointments');

const app = express();
const port = process.env.PORT_API;

app.use(express.json());
app.use(cors());

app.get('/api', (req, res) => {
    res.json('Helix: A System for Patient Management [[API]]');
});

app.use('/api/patients', patients);
app.use('/api/appointments', appointments);

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});