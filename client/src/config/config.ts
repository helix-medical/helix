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

const cnf: IConfig = {
    defaultAmount: 50,
    defaultPaymentMethod: 'card',
    durationAppointment: 50,
    durationBreak: 10,
    formatDate: 'YYYY-MM-DD',
    formatDatePretty: 'DD MMMM YYYY',
    formatDateTime: 'YYYY-MM-DD HH:mm',
    formatDateTimePretty: 'DD MMMM YYYY [at] HH:mm',
    nbWorkDays: 5,
    nbWorkHours: 8,
    roles: {
        ADMIN: 2003,
        PRACTITIONER: 1998,
        SECRETARY: 1515,
    },
    cabinet: {
        name: 'Cabinet de la Grande Place',
        address: '1, Grande Place',
        city: '35000 Rennes',
        phone: '02 99 99 99 99',
        email: 'contact@grandeplace.fr',
        website: 'grandeplace.fr',
        siret: '123 456 789 01234',
    },
};

export default cnf;
export { getRole };
