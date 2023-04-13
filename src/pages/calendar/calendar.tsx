import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Badge, Paper, Title } from '@mantine/core';
import { useCallback, useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import cnf from '../../config/config';
import '../../styles/calendar.css';
import Toolbar from './toolbar';
import Event from './event';

interface IEvent {
    start: Date;
    end: Date;
    title: string;
    id: string;
}

const Calendar = () => {
    const [events, setEvents] = useState<IEvent[]>([]);
    useEffect(() => {
        const fetchEvents = async () => {
            const res = await axios.get('api/appointments/all');
            const events = res.data.map((event: any) => ({
                start: moment(event.date).toDate(),
                end: moment(event.date).add(cnf.durationAppointment, 'minute').toDate(),
                title: `${event.name} ${event.lastName}`,
                id: event.id,
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

    const onSelectEvent = useCallback((event: IEvent) => {
        console.log(event);
    }, []);

    const { formats, localizer, messages, components } = useMemo(
        () => ({
            formats: {
                selectRangeFormat: ({ start, end }: { start: Date; end: Date }) =>
                    `${localizer.format(start, 'HH:mm', 'fr')} - ${localizer.format(end, 'hh:mm', 'fr')}`,
                dateFormat: 'DD',
                dayFormat: 'ddd DD',
                dayRangeHeaderFormat: ({ start, end }: { start: Date; end: Date }) =>
                    `${localizer.format(start, 'ddd DD MMM', 'fr')} - ${localizer.format(end, 'ddd DD MMM', 'fr')}`,
                dayHeaderFormat: 'dddd DD MMMM',
                agendaDateFormat: 'dddd DD',
                agendaTimeFormat: 'HH:mm',
                agendaTimeRangeFormat: ({ start, end }: { start: Date; end: Date }) =>
                    `${localizer.format(start, 'HH:mm', 'fr')} - ${localizer.format(end, 'HH:mm', 'fr')}`,
                eventTimeRangeFormat: ({ start, end }: { start: Date; end: Date }) =>
                    `${localizer.format(start, 'HH:mm', 'fr')} - ${localizer.format(end, 'HH:mm', 'fr')}`,
                timeGutterFormat: 'HH:mm',
                agendaHeaderFormat: ({ start, end }: { start: Date; end: Date }) =>
                    `${localizer.format(start, 'ddd DD MMM', 'fr')} - ${localizer.format(end, 'ddd DD MMM', 'fr')}`,
            },
            localizer: momentLocalizer(moment),
            messages: {
                date: 'Date',
                time: 'Time',
                event: 'Event',
                allDay: 'All Day',
                week: 'Week',
                work_week: 'Work Week',
                day: 'Day',
                month: 'Month',
                previous: 'Back',
                next: 'Next',
                yesterday: 'Yesterday',
                tomorrow: 'Tomorrow',
                today: 'Today',
                agenda: 'Agenda',
                noEventsInRange: 'There are no events in this range.',
                showMore: (total: number) => `+${total} more`,
            },
            components: {
                toolbar: Toolbar,
                event: Event,
            },
        }),
        []
    );
    return (
        <>
            <Title order={1} mb="xl">
                Calendar{' '}
                <Badge color="teal" size="xl">
                    Beta
                </Badge>
            </Title>
            <Paper shadow="sm" radius="md" p="lg" withBorder my="lg">
                <BigCalendar
                    localizer={localizer}
                    events={events}
                    defaultView="week"
                    formats={formats}
                    max={new Date(1972, 0, 1, 19, 59, 59)}
                    min={new Date(1972, 0, 1, 8, 0, 0)}
                    slotGroupPropGetter={slotGroupPropGetter}
                    views={['week', 'day', 'agenda']}
                    messages={messages}
                    selectable
                    onSelectEvent={onSelectEvent}
                    components={components}
                />
            </Paper>
        </>
    );
};

export default Calendar;
