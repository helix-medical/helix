import configJSON from './config.json';

interface IConfig {
    defaultAmount: number;
    defaultPaymentMethod: string;
    durationAppointment: number;
    durationBreak: number;
    roles: {
        ADMIN: number;
        PRACTITIONER: number;
        SECRETARY: number;
    };
}

const cnf = configJSON as IConfig;

export default cnf;
