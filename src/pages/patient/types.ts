export interface IPatient {
    id: string;
    name: string;
    lastName: string;
    birthDate: string;
    sex: string;
    city: string;
    email: string;
    phone: string;
    address: string;
    job: string;
    doctor: string;
    medicalIssues: string;
}

export interface IPassif {
    lastAppointments: string[];
    medicalIssues: string;
}

export interface IAppointment {
    appID: string;
    kind: string;
    status: string;
    start: string;
    end: string;
    practitionerName: string;
    practitionerLastName: string;
    payment?: string;
    amount?: string;
    method?: string;
    content: string;
}

export interface ITransaction {
    id: string;
    amount: string;
    method: string;
    date: string;
}
