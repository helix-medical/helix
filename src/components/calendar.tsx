import { Calendar as BigCalendar, DateLocalizer, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Badge, Paper, Title } from '@mantine/core';
import { useCallback, useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import cnf from '../config/config';

const Calendar = () => {
    const [events, setEvents] = useState([]);
    useEffect(() => {
        const fetchEvents = async () => {
            const res = await axios.get('api/appointments/all');
            const events = res.data.map((event: any) => ({
                start: moment(event.date).toDate(),
                end: moment(event.date).add(cnf.durationAppointment, 'minute').toDate(),
                title: `${event.name} ${event.lastName}`,
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

    const { formats, localizer } = useMemo(
        () => ({
            formats: {
                selectRangeFormat: (
                    { start, end }: { start: Date; end: Date },
                    culture: string,
                    localizer: DateLocalizer
                ) => localizer.format(start, 'HH:mm', culture) + '+' + localizer.format(end, 'hh:mm', culture),
                dayFormat: (date: Date, culture: string, localizer: DateLocalizer) =>
                    localizer.format(date, 'ddd MM/DD', culture),
            },
            localizer: momentLocalizer(moment),
            // messages: {
            //     date: 'Date',
            //     time: 'Time',
            //     event: 'Event',
            //     allDay: 'All Day',
            //     week: 'Week',
            //     work_week: 'Work Week',
            //     day: 'Day',
            //     month: 'Month',
            //     previous: 'Back',
            //     next: 'Next',
            //     yesterday: 'Yesterday',
            //     tomorrow: 'Tomorrow',
            //     today: 'Today',
            //     agenda: 'Agenda',
            //     noEventsInRange: 'There are no events in this range.',
            //     showMore: (total: number) => `+${total} more`,
            // },
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
                    formats={formats as any}
                    max={new Date(1972, 0, 1, 19, 59, 59)}
                    min={new Date(1972, 0, 1, 8, 0, 0)}
                    slotGroupPropGetter={slotGroupPropGetter}
                    views={['week', 'day', 'agenda']}
                />
            </Paper>
        </>
    );
};

export default Calendar;
