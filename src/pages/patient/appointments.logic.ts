import { useEffect, useState } from 'react';
import useApplicationRoutes from '../../api/routes';

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

const usePatientAppointments = (id: string) => {
    const routes = useApplicationRoutes();
    const [appointments, setAppointments] = useState<IAppointment[]>([]);

    useEffect(() => {
        const fetchPatientAppointments = async () => {
            try {
                const response = await routes.appointments.getByPatient(id);
                setAppointments(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchPatientAppointments();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    return { appointments };
};

export { usePatientAppointments };
