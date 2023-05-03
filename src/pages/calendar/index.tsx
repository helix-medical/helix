import React, { useEffect } from 'react';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Badge, Paper, Title } from '@mantine/core';
import { Calendar as BigCalendar } from 'react-big-calendar';
import useCalendarConfig from './calendar-config';
import Styles from './styles';
import { useCalendarLogic } from './calendar.logic';
import ViewEvent from './view';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import moment from 'moment';
import CreateEvent from './create';

const Calendar = () => {
    const { classes } = Styles();
    const {
        slotGroupPropGetter,
        handleResizeEvent,
        events,
        event,
        handleClose,
        onSelectEvent,
        opened,
        fetchEvents,
        openCreate,
        toggleOpenCreate,
        onCreateEvent,
        range,
    } = useCalendarLogic();
    const { customComponents, formats, localizer, messages } = useCalendarConfig();
    const HelixCalendar = withDragAndDrop(BigCalendar);

    useEffect(() => {
        fetchEvents();

        return () => {};
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <Title order={1} mb="xl">
                Calendar{' '}
                <Badge color="fr-cyan.4" size="xl">
                    Beta
                </Badge>
            </Title>
            <Paper shadow="sm" radius="md" p="lg" withBorder my="lg">
                <HelixCalendar
                    defaultDate={moment('2023-04-16').toDate()}
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
                    onSelectSlot={(range) => onCreateEvent(range)}
                    onSelectEvent={onSelectEvent as any}
                    components={customComponents}
                    draggableAccessor={(event) => true}
                    onDragStart={(event) => console.log(event)}
                    onEventResize={handleResizeEvent as any}
                    onEventDrop={handleResizeEvent as any}
                />
            </Paper>
            <ViewEvent event={event} opened={opened} handleClose={handleClose} />
            {openCreate ? <CreateEvent opened={openCreate} handler={toggleOpenCreate} range={range} /> : null}
        </>
    );
};

export default Calendar;
