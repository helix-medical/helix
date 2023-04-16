import moment from 'moment';
import { useCallback, useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import { IEvent } from '../../interfaces';
import axios from 'axios';

const localizer = momentLocalizer(moment);

const HomeCalendar = () => {
    const [events, setEvents] = useState<IEvent[]>([]);
    useEffect(() => {
        const fetchEvents = async () => {
            const res = await axios.get('api/events');
            const events = res.data.map((event: any) => ({
                start: moment(event.start).toDate(),
                end: moment(event.end).toDate(),
                title: `${event.title}`,
                id: event.id,
                kind: event.appID !== '' ? 'app' : 'event',
            }));
            setEvents(events);
        };
        fetchEvents();
    }, []);
    const slotGroupPropGetter = useCallback(
        () => ({
            style: {
                minHeight: 60,
            },
        }),
        []
    );
    return (
        <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            defaultView="agenda"
            max={new Date(1972, 0, 1, 19, 59, 59)}
            min={new Date(1972, 0, 1, 8, 0, 0)}
            slotGroupPropGetter={slotGroupPropGetter}
        />
    );
};

export default HomeCalendar;
