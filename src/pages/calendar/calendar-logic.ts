import { useCallback, useState } from 'react';
import setNotification from '../../components/errors/feedback-notif';
import moment from 'moment';
import cnf from '../../config/config';
import { IEvent } from '../../types/interfaces';
import useSecureAPI from '../../hooks/use-secure-api';

const CalendarLogic = () => {
    const [refresh, setRefresh] = useState(false);
    const [events, setEvents] = useState<IEvent[]>([]);
    const api = useSecureAPI();
    const [event, setEvent] = useState<IEvent>({
        start: new Date(),
        end: new Date(),
        title: '',
        id: '',
        kind: 'event',
    });
    const [opened, setOpened] = useState(false);

    const handleClose = () => {
        setOpened(false);
    };

    const slotGroupPropGetter = useCallback(() => ({ style: { minHeight: 60 } }), []);

    const handleResizeEvent = async ({ event, start, end }: { event: IEvent; start: Date; end: Date }) => {
        const { id } = event;
        try {
            const res = await api.put(`/events/${id}/date`, {
                start: moment(start).format(cnf.formatDateTime),
                end: moment(end).format(cnf.formatDateTime),
            });
            setNotification(false, res.data.message);
            setRefresh(!refresh);
        } catch (err: any) {
            setNotification(true, err.response.data.message);
        }
    };

    const fetchEvents = async () => {
        const res = await api.get('/events');
        const events = res.data.map((event: any) => ({
            start: moment(event.start).toDate(),
            end: moment(event.end).toDate(),
            title: `${event.title}`,
            id: event.id,
            kind: event.appID !== '' ? 'app' : 'event',
        }));
        setEvents(events);
    };

    const onSelectEvent = (event: IEvent) => {
        setEvent(event);
        setOpened(true);
    };

    return {
        slotGroupPropGetter,
        handleResizeEvent,
        refresh,
        fetchEvents,
        events,
        onSelectEvent,
        opened,
        handleClose,
        event,
    };
};

export default CalendarLogic;
