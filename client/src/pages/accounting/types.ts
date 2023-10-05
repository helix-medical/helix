export interface ISum {
    sum: number;
    checks: number;
    cashs: number;
    cards: number;
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
