import { IEvent } from '../types/interfaces';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import setNotification from './errors/feedback-notification';
import useApplicationRoutes from '../api/routes';

export interface IPeekAppointment {
    appID: string;
    birthDate: string;
    email: string;
    kind: string;
    patientID: string;
    patientLastName: string;
    patientName: string;
    phone: string;
    practitionerLastName: string;
    practitionerName: string;
    status: string;
}

const usePeekAppointment = (input: IEvent) => {
    const routes = useApplicationRoutes();
    const navigate = useNavigate();
    const [event, setEvent] = useState<IPeekAppointment>({
        appID: '',
        birthDate: '',
        email: '',
        kind: '',
        patientID: '',
        patientLastName: '',
        patientName: '',
        phone: '',
        practitionerLastName: '',
        practitionerName: '',
        status: '',
    });

    useEffect(() => {
        const fetchEvent = async () => {
            if (input.kind !== 'app') return;
            if (input.id === '' || input.id === '00000000') return;
            try {
                const response = await routes.appointments.getFromEvent(input.id);
                setEvent(response.data[0]);
            } catch (error: any) {
                setNotification(true, error.response.data.message);
            }
        };
        fetchEvent();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [input]);

    return { navigate, event };
};

export { usePeekAppointment };
