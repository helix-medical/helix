import React from 'react';
import { EventProps } from 'react-big-calendar';
// import moment from 'moment';
import { Group, Text } from '@mantine/core';
import { IEvent } from '../../interfaces';
import KindAppointment from '../../components/customBadges/kind-appointment';

const AgendaEvent = ({ event }: EventProps<IEvent>) => {
    return (
        <Group position="left">
            <KindAppointment kind={event.kind} />
            <Text>{event.title}</Text>
        </Group>
    );
};

export default AgendaEvent;
