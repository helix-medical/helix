const Ajv = require('ajv');
const ajv = new Ajv();

const schemaPatientCreate = require('./schemas/create-patient.json');
const schemaPatientUpdate = require('./schemas/update-patient.json');
const schemaAppointmentCreate = require('./schemas/create-appointment.json');
const schemaAppointmentUpdate = require('./schemas/update-appointment.json');

// Add formats for specific data types

module.exports = {
    patientCreate: ajv.compile(schemaPatientCreate),
    patientUpdate: ajv.compile(schemaPatientUpdate),
    appointmentCreate: ajv.compile(schemaAppointmentCreate),
    appointmentUpdate: ajv.compile(schemaAppointmentUpdate)
};