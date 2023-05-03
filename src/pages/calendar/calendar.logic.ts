import { useCallback, useEffect, useState } from 'react';
import { IEvent } from '../../types/interfaces';
import cnf from '../../config/config';
import moment from 'moment';
import setNotification from '../../components/errors/feedback-notification';
import useApplicationRoutes from '../../api/routes';
import { useToolbarLogic } from './toolbar.logic';

const useCalendarLogic = () => {
    const routes = useApplicationRoutes();
    const { calendar } = useToolbarLogic();

    const [refresh, setRefresh] = useState(false);
    const [events, setEvents] = useState<IEvent[]>([]);
    const [opened, setOpened] = useState(false);
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

    useEffect(() => {
        // fetchEvents();
        console.log('calendar', calendar);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [calendar]);

    const slotGroupPropGetter = useCallback(() => ({ style: { minHeight: 60 } }), []);

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
                console.log('all');
                res = await routes.events.getAll();
            } else {
                console.log('calendar', calendar);
                res = await routes.events.getByCalendar(calendar);
            }
            const events = res.data.map((event: any) => ({
                start: moment(event.start).toDate(),
                end: moment(event.end).toDate(),
                title: `${event.title}`,
                id: event.id,
                kind: event.appID !== '' ? 'app' : 'event',
            }));
            setEvents(events);
        } catch (err: any) {
            setNotification(true, err.response.data.message);
        }
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

export { useCalendarLogic };
