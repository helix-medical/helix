import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useApplicationRoutes from '../../api/routes';
import setNotification from '../../components/errors/feedback-notification';

export interface IViewEvent {
    appID: string;
    patientID: string;
    patientName: string;
    patientLastName: string;
    email: string;
    phone: string;
    birthDate: string;
    practitionerName: string;
    practitionerLastName: string;
    kind: string;
    status: string;
}

const useViewEvent = (id: string) => {
    const routes = useApplicationRoutes();
    const navigate = useNavigate();
    const [event, setEvent] = useState<IViewEvent>({
        appID: '',
        patientID: '',
        patientName: '',
        patientLastName: '',
        email: '',
        phone: '',
        birthDate: '',
        practitionerName: '',
        practitionerLastName: '',
        kind: '',
        status: '',
    });

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const response = await routes.appointments.getFromEvent(id);
                setEvent(response.data[0]);
            } catch (error: any) {
                setNotification(true, error.response.data.message);
            }
        };
        fetchEvent();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return {
        navigate,
        event,
    };
};

export { useViewEvent };
