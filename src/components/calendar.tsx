import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Badge, Paper, Title } from '@mantine/core';
import { useEffect, useState } from 'react';
import axios from 'axios';
import cnf from '../config/config';

// const events = [
// {
// start: moment('2023-04-05 12:34').toDate(),
// end: moment().toDate(),
// title: 'Some title',
// },
// ];

const Calendar = () => {
    const [events, setEvents] = useState([]);
    useEffect(() => {
        const fetchEvents = async () => {
            const res = await axios.get('api/appointments');
            const events = res.data.map((event: any) => ({
                start: moment(event.date).toDate(),
                end: moment(event.date).add(cnf.durationAppointment, 'minute').toDate(),
                title: `Appointment n° ${event.id}`,
            }));
            setEvents(events);
        };
        fetchEvents();
    }, []);

    const localizer = momentLocalizer(moment);
    return (
        <>
            <Title order={1} mb="xl">
                Calendar <Badge color="teal">Beta</Badge>
            </Title>
            <Paper shadow="sm" radius="md" p="lg" withBorder my="lg">
                <BigCalendar localizer={localizer} events={events} defaultView="week" />
            </Paper>
        </>
    );
};

export default Calendar;
