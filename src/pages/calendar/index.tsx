import React, { useEffect } from 'react';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Badge, Paper, Title } from '@mantine/core';
import { Calendar as BigCalendar } from 'react-big-calendar';
import CalendarConfig from './calendar-config';
import CalendarLogic from './calendar-logic';
import Styles from './styles';
import ViewEvent from './view';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';

const Calendar = () => {
    const { classes } = Styles();
    const {
        slotGroupPropGetter,
        handleResizeEvent,
        refresh,
        fetchEvents,
        events,
        event,
        handleClose,
        onSelectEvent,
        opened,
    } = CalendarLogic();
    const { customComponents, formats, localizer, messages } = CalendarConfig();
    const HelixCalendar = withDragAndDrop(BigCalendar);

    useEffect(() => {
        fetchEvents();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [refresh]);

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
                    className={classes.calendar}
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
                    onSelectSlot={(range) => console.log(range) as any}
                    onSelectEvent={onSelectEvent as any}
                    components={customComponents}
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
