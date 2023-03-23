const Ajv = require('ajv');
const ajv = new Ajv();

const schemaPatient = require('./schemas/patient.json');
const schemaAppointmentCreate = require('./schemas/create-appointment.json');
const schemaAppointmentUpdate = require('./schemas/update-appointment.json');

// Add formats for specific data types

module.exports = {
    patient: ajv.compile(schemaPatient),
    appointmentCreate: ajv.compile(schemaAppointmentCreate),
    appointmentUpdate: ajv.compile(schemaAppointmentUpdate)
};