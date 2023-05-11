export interface IAppointmentContent {
    anamnesis: {
        reasons: string;
        symptoms: string;
        knownDiseases: string;
    };
    conclusion: {
        diagnosis: string;
        treatment: string;
        observations: string;
    };
    payment: {
        amount: number;
        method: string;
    };
}

export interface IAppointmentData {
    address: string;
    appID: string;
    birthDate: string;
    city: string;
    date: string;
    doctor: string;
    email: string;
    job: string;
    kind: string;
    lastAppointments: string[];
    lastName: string;
    medicalIssues: string;
    name: string;
    patientID: string;
    phone: string;
    practitionerLastName: string;
    practitionerName: string;
    sex: string;
}
