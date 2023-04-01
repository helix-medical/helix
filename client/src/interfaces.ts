export interface IPatient {
    id?: number;
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
    id?: number;
    patientId: string;
    date: string;
    reasons: string;
    anamnesis: string;
    conclusion: string;
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
    id?: string;
    date: string;
    reasons: string;
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
}

export interface IAppointmentExtended {
    id?: string;
    date: string;
    reasons: string;
    anamnesis: string;
    conclusion: string;
    patientId: string;
    status: string;
    name: string;
    lastName: string;
    sex: string;
}

export interface IAppointmentDataEdit {
    id?: string;
    date: string;
    reasons: string;
    patientId: string;
    name: string;
    lastName: string;
    email: string;
    birthDate: string;
    sex: string;
    city: string;
    passif: string;
}

export interface IUsers {
    id?: number;
    username: string;
    password: string;
    role: string;
}
