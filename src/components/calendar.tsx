import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Badge, Title } from '@mantine/core';

const events = [
    {
        start: moment('2023-04-05 12:34').toDate(),
        end: moment().toDate(),
        title: 'Some title',
    },
];

const Calendar = () => {
    const localizer = momentLocalizer(moment);
    return (
        <>
            <Title order={1} mb="xl">
                Calendar <Badge color="teal">Beta</Badge>
            </Title>
            <BigCalendar localizer={localizer} events={events} toolbar={false} defaultView="week" />
        </>
    );
};

export default Calendar;
