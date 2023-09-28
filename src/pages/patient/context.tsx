import { ReactNode, createContext, useContext, useState } from 'react';

const PatientContext = createContext({});

const PatientProvider = ({ children }: { children: ReactNode }) => {
    const [update, setUpdate] = useState(false);
    return <PatientContext.Provider value={{ update, setUpdate }}>{children}</PatientContext.Provider>;
};

const usePatientContext = (): { update: boolean; setUpdate: (state: boolean) => void } => {
    return useContext<any>(PatientContext);
};

export { PatientProvider, usePatientContext };
