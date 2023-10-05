import { useNavigate } from 'react-router-dom';
import { IEvent } from '../../types/interfaces';
import { useEffect, useState } from 'react';
import moment from 'moment';
import useApplicationRoutes from '../../api/routes';

const useNextAppointmentWrapper = (input: IEvent) => {
    const navigate = useNavigate();
    const routes = useApplicationRoutes();
    const [event, setEvent] = useState<IEvent>({
        id: '',
        title: '',
        start: new Date(),
        end: new Date(),
        kind: '',
    });

    useEffect(() => {
        const fetchEvent = async () => {
            if (input.id !== '') setEvent(input);
            else {
                try {
                    const response = await routes.events.getNextAppointment(moment().format('YYYY-MM-DD'));
                    setEvent({
                        end: moment(response.data[0].end).toDate(),
                        id: response.data[0].id,
                        kind: response.data[0].appID !== '' ? 'app' : 'event',
                        start: moment(response.data[0].start).toDate(),
                        title: `${response.data[0].title}`,
                    });
                } catch (error: any) {
                    if (error.response.status === 404) setEvent({ ...input, id: '00000000' });
                }
            }
        };
        fetchEvent();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [input]);

    return { navigate, event };
};

export { useNextAppointmentWrapper };
