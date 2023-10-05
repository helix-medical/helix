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

const getRole = (role: number) => {
    switch (role) {
        case cnf.roles.ADMIN:
            return 'ADMIN';
        case cnf.roles.PRACTITIONER:
            return 'PRACTITIONER';
        case cnf.roles.SECRETARY:
            return 'SECRETARY';
        default:
            return 'UNKNOWN';
    }
};

const cnf = configJSON as IConfig;

export default cnf;
export { getRole };
