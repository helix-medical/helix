import Ajv from 'ajv';
const ajv: Ajv = new Ajv();

import schemaPatientCreate from './schemas/create-patient.json';
import schemaPatientUpdate from './schemas/update-patient.json';
import schemaAppointmentCreate from './schemas/create-appointment.json';
import schemaAppointmentUpdate from './schemas/update-appointment.json';

// Add formats for specific data types

export default module.exports = {
    patientCreate: ajv.compile(schemaPatientCreate),
    patientUpdate: ajv.compile(schemaPatientUpdate),
    appointmentCreate: ajv.compile(schemaAppointmentCreate),
    appointmentUpdate: ajv.compile(schemaAppointmentUpdate)
};