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
    doctor: string;
    job: string;
    phone: string;
    address: string;
}

export interface IAppointmentExtended {
    id: string;
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
    doctor: string;
    job: string;
    phone: string;
    address: string;
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
    uid: string;
    date: string;
    method: string;
    amount: string;
    patientName: string;
    patientLastName: string;
    appointment: string;
}

export interface IEvent {
    id: string;
    title: string;
    start: Date;
    end: Date;
    kind: string;
}
