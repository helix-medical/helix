import React, { useCallback, useEffect, useMemo, useState } from 'react';
import moment from 'moment';
import { Calendar, EventProps, Navigate, ToolbarProps, momentLocalizer } from 'react-big-calendar';
import { IEvent } from '../../types/interfaces';
import { ActionIcon, Group, Text, Title } from '@mantine/core';
import {
    IconArrowUpRight,
    IconCalendar,
    IconChevronLeft,
    IconChevronRight,
    IconReportMedical,
} from '@tabler/icons-react';
import IdBadge from '../../components/customBadges/id';
import { useNavigate } from 'react-router-dom';
import useSecureAPI from '../../hooks/use-secure-api';

const localizer = momentLocalizer(moment);
const color = 'fr-cyan';

const Toolbar = ({ label, onNavigate }: ToolbarProps<IEvent>) => {
    return (
        <Group position="apart" mb="md" ml="sm" mr="sm">
            <Text fz="lg" fw={700}>
                {label}
            </Text>
            <Group>
                <ActionIcon size="lg" onClick={() => onNavigate(Navigate.PREVIOUS)} color={color}>
                    <IconChevronLeft size="1.5rem" />
                </ActionIcon>
                <ActionIcon size="lg" onClick={() => onNavigate(Navigate.TODAY)} color={color}>
                    <IconCalendar size="1.5rem" />
                </ActionIcon>
                <ActionIcon size="lg" onClick={() => onNavigate(Navigate.NEXT)} color={color}>
                    <IconChevronRight size="1.5rem" />
                </ActionIcon>
            </Group>
        </Group>
    );
};

const DateH = (props: any) => {
    return (
        <Text fz="sm" fw={700}>
            {props.label}
        </Text>
    );
};

const Time = (props: any) => {
    return <Text fz="sm">{props.label}</Text>;
};

const Event = ({ event }: EventProps<IEvent>) => {
    return (
        <Group position="apart">
            <Group>
                <IdBadge id={event.id} color={event.kind === 'app' ? 'fr-orange.4' : color} />
                <Text>{event.title}</Text>
            </Group>
            <ActionIcon color={event.kind === 'app' ? 'fr-orange.4' : color}>
                {event.kind === 'app' ? <IconReportMedical size="1.2rem" /> : <IconCalendar size="1.2rem" />}
            </ActionIcon>
        </Group>
    );
};

const HomeCalendar = () => {
    const api = useSecureAPI();
    const [events, setEvents] = useState<IEvent[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
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
        fetchEvents();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const slotGroupPropGetter = useCallback(
        () => ({
            style: {
                minHeight: 60,
            },
        }),
        []
    );

    const { formats, components } = useMemo(
        () => ({
            formats: {
                agendaDateFormat: 'dddd DD MMM',
                agendaTimeFormat: 'HH:mm',
                agendaTimeRangeFormat: ({ start, end }: { start: Date; end: Date }) =>
                    `${localizer.format(start, 'HH:mm', 'fr')} - ${localizer.format(end, 'HH:mm', 'fr')}`,
                agendaHeaderFormat: ({ start, end }: { start: Date; end: Date }) =>
                    `${localizer.format(start, 'ddd DD MMM', 'fr')} - ${localizer.format(end, 'ddd DD MMM', 'fr')}`,
            },
            components: {
                toolbar: Toolbar,
                agenda: {
                    event: Event,
                    date: DateH,
                    time: Time,
                },
            },
        }),
        []
    );

    return (
        <>
            <Group position="apart" spacing="md">
                <div></div>
                <Title order={2}>Week Calendar</Title>
                <ActionIcon color={color} size="xl" onClick={() => navigate('/calendar')}>
                    <IconArrowUpRight size="1.5rem" />
                </ActionIcon>
            </Group>
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                defaultView="agenda"
                views={['agenda']}
                max={new Date(1972, 0, 1, 19, 59, 59)}
                min={new Date(1972, 0, 1, 8, 0, 0)}
                slotGroupPropGetter={slotGroupPropGetter}
                components={components}
                formats={formats}
                length={7}
            />
        </>
    );
};

export default HomeCalendar;
