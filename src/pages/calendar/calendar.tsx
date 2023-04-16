import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import { Badge, Paper, Title, useMantineTheme, Text } from '@mantine/core';
import { useCallback, useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import '../../styles/calendar.css';
import Toolbar from './toolbar';
import Event from './event';
import { IEvent } from '../../interfaces';
import AgendaEvent from './agendaEvent';
import ViewEvent from './view';
import DateCellWrapper from './dateCellWrapper';
import cnf from '../../config/config';
import setNotification from '../system/errors/feedbackNotif';

const Calendar = () => {
    const theme = useMantineTheme();
    const borderColor = theme.colorScheme === 'dark' ? '#373A40' : '#dee2e6';
    const HelixCalendar = withDragAndDrop(BigCalendar);
    const [events, setEvents] = useState<IEvent[]>([]);
    const [refresh, setRefresh] = useState(false);
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
    }, [refresh]);

    const slotGroupPropGetter = useCallback(
        () => ({
            style: {
                minHeight: 60,
            },
        }),
        []
    );

    const onSelectEvent = useCallback((event: IEvent, e: { preventDefault: () => void }) => {
        e.preventDefault();
        setEvent(event);
        setOpened(true);
    }, []);

    const dayPropGetter = useCallback(
        (date: Date) => ({
            ...(moment(date).day() === moment().day() && {
                color: 'red',
            }),
        }),
        []
    );

    const customComponents = {
        dateCellWrapper: DateCellWrapper,
        dayPropGetter: (props: any) => {
            const style = {
                border: `1px solid`,
                borderColor: borderColor,
                backgroundColor: 'red',
            };
            return <div style={style}>{props.children}</div>;
        },

        timeSlotWrapper: (props: any) => {
            const style = {
                backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0],
            };
            return <div style={style}>{props.children}</div>;
        },

        eventContainerWrapper: (props: any) => {
            const style = {
                backgroundColor: 'red',
            };
            return <div style={style}>{props.children}</div>;
        },
        timeGutterWrapper: (props: any): any => {
            const style = {
                backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0],
            };
            return (
                <Text tt="uppercase" fw={500} style={style}>
                    {props.children}
                </Text>
            );
        },
        toolbar: Toolbar,
        week: {
            event: Event as any,
            header: (props: any) => {
                return (
                    <Text tt="uppercase" fw={700}>
                        {props.label}
                    </Text>
                );
            },
        },
        day: {
            event: Event as any,
        },
        agenda: {
            event: AgendaEvent as any,
            header: (props: any) => {
                return (
                    <Text tt="uppercase" fw={700}>
                        {props.label}
                    </Text>
                );
            },
        },
    };

    const handleResizeEvent = useCallback(
        async ({ event, start, end }: { event: IEvent; start: Date; end: Date }) => {
            const { id } = event;
            try {
                const res = await axios.put(`api/events/${id}/date`, {
                    start: moment(start).format(cnf.formatDateTime),
                    end: moment(end).format(cnf.formatDateTime),
                });
                setNotification(false, res.data.message);
                setRefresh(!refresh);
            } catch (err: any) {
                setNotification(true, err.response.data.message);
            }
        },
        [refresh]
    );

    const { formats, localizer, messages } = useMemo(
        () => ({
            formats: {
                selectRangeFormat: ({ start, end }: { start: Date; end: Date }) =>
                    `${localizer.format(start, 'HH:mm', 'fr')} - ${localizer.format(end, 'hh:mm', 'fr')}`,
                dateFormat: 'DD',
                dayFormat: 'ddd DD',
                dayRangeHeaderFormat: ({ start, end }: { start: Date; end: Date }) =>
                    `${localizer.format(start, 'ddd DD MMM', 'fr')} - ${localizer.format(end, 'ddd DD MMM', 'fr')}`,
                dayHeaderFormat: 'dddd DD MMMM',
                agendaDateFormat: 'dddd DD MMM',
                agendaTimeFormat: 'HH:mm',
                agendaTimeRangeFormat: ({ start, end }: { start: Date; end: Date }) =>
                    `${localizer.format(start, 'HH:mm', 'fr')} - ${localizer.format(end, 'HH:mm', 'fr')}`,
                eventTimeRangeFormat: ({ start, end }: { start: Date; end: Date }) => '',
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
                <HelixCalendar
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
                    onSelectEvent={onSelectEvent as any}
                    components={customComponents}
                    dayPropGetter={dayPropGetter}
                    draggableAccessor={(event) => true}
                    onDragStart={(event) => console.log(event)}
                    onEventResize={handleResizeEvent as any}
                    onEventDrop={handleResizeEvent as any}
                />
                <ViewEvent event={event} opened={opened} handleClose={handleClose} />
            </Paper>
        </>
    );
};

export default Calendar;
