import React from 'react';
import { EventProps } from 'react-big-calendar';
import { Badge, Group, Text } from '@mantine/core';
import { IEvent } from '../../types/interfaces';

const AgendaEvent = ({ event }: EventProps<IEvent>) => {
    return (
        <Group position="left">
            <Badge variant="outline" color={event.kind === 'app' ? 'fr-orange.4' : 'fr-cyan.4'} size="sm">
                {event.kind}
            </Badge>
            <Text>{event.title}</Text>
        </Group>
    );
};

export default AgendaEvent;
