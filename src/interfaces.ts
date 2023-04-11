export interface IPatient {
    id: string;
    name: string;
    lastName: string;
    birthDate: string;
    sex: string;
    city: string;
    email: string;
    nextApp: string;
    passif: string;
}

export interface IAppointment {
    id?: string;
    patientId: string;
    date: string;
    kind: string;
    content: string;
}

export interface IPassif {
    lastAppointments: number[];
    medicalIssues: string;
}

export interface IAnamnesis {
    reasons: string;
    symptoms: string;
    knownDiseases: string;
    knownMedications: string;
}

export interface IConclusion {
    diagnosis: string;
    treatment: string;
    observations: string;
}

export interface IAppointmentDataView {
    appID?: string;
    date: string;
    kind: string;
    anamnesis: string;
    conclusion: string;
    patientId: string;
    status: string;
    name: string;
    lastName: string;
    email: string;
    birthDate: string;
    sex: string;
    city: string;
    passif: string;
    amount: string;
    method: string;
    pName: string;
    pLastName: string;
}

export interface IAppointmentExtended {
    id?: string;
    date: string;
    kind: string;
    content: string;
    patientId: string;
    status: string;
    name: string;
    lastName: string;
    sex: string;
}

export interface IAppointmentDataEdit {
    appID?: string;
    date: string;
    kind: string;
    patientId: string;
    name: string;
    lastName: string;
    email: string;
    birthDate: string;
    sex: string;
    city: string;
    passif: string;
    pName: string;
    pLastName: string;
}

export interface IUsers {
    uid?: string;
    name: string;
    lastName: string;
    role: string;
    state: string;
    password: string;
    clearPassword: string;
    lastActive: string;
}

export interface ITransactions {
    uid?: string;
    date: string;
    method: string;
    amount: number;
    patientName: string;
    patientLastName: string;
    appointment: string;
}
