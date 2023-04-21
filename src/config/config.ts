import configJSON from './config.json';

interface IConfig {
    defaultAmount: number;
    defaultPaymentMethod: string;
    durationAppointment: number;
    durationBreak: number;
    formatDate: string;
    formatDatePretty: string;
    formatDateTime: string;
    formatDateTimePretty: string;
    nbWorkDays: number;
    nbWorkHours: number;
    roles: {
        ADMIN: number;
        PRACTITIONER: number;
        SECRETARY: number;
    };
    cabinet: {
        name: string;
        address: string;
        city: string;
        phone: string;
        email: string;
        website: string;
        siret: string;
    };
}

const cnf = configJSON as IConfig;

export default cnf;
