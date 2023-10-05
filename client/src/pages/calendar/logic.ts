import { useState } from 'react';
import { IEvent } from '../../types/interfaces';
import cnf from '../../config/config';
import moment from 'moment';
import setNotification from '../../components/errors/feedback-notification';
import useApplicationRoutes from '../../api/routes';

const useCalendar = () => {
    const routes = useApplicationRoutes();

    const [calendar, setCalendar] = useState<string>('all');
    const [openCreate, setOpenCreate] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const [events, setEvents] = useState<IEvent[]>([]);
    const [opened, setOpened] = useState(false);
    const [range, setRange] = useState<any>({
        start: new Date(),
        end: new Date(),
    });
    const [event, setEvent] = useState<IEvent>({
        start: new Date(),
        end: new Date(),
        title: '',
        id: '',
        kind: 'event',
    });

    const handleClose = () => {
        setOpened(false);
    };

    const handleCalendarChange = (calendar: string) => {
        setCalendar(calendar);
    };

    const toggleOpenCreate = () => {
        setOpenCreate(!openCreate);
    };

    const handleResizeEvent = async ({ event, start, end }: { event: IEvent; start: Date; end: Date }) => {
        const { id } = event;
        try {
            const res = await routes.events.updateDate(id, {
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
        try {
            let res;
            if (calendar === 'all') {
                // console.log('all');
                res = await routes.events.getAll();
            } else {
                // console.log('calendar', calendar);
                res = await routes.events.getByCalendar(calendar);
            }
            const eventsTMP = res.data.map((event: any) => ({
                start: moment(event.start).toDate(),
                end: moment(event.end).toDate(),
                title: `${event.title}`,
                id: event.id,
                kind: event.appID !== '' ? 'app' : 'event',
            }));
            setEvents(eventsTMP);
        } catch (err: any) {
            setNotification(true, err.response.data.message);
        }
    };

    const onSelectEvent = (event: IEvent) => {
        setEvent(event);
        setOpened(true);
    };

    const onCreateEvent = (range: any) => {
        setRange(range);
        setOpenCreate(true);
    };

    return {
        handleResizeEvent,
        events,
        onSelectEvent,
        fetchEvents,
        opened,
        handleClose,
        event,
        calendar,
        handleCalendarChange,
        openCreate,
        toggleOpenCreate,
        onCreateEvent,
        range,
    };
};

export { useCalendar };
