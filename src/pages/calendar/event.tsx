import React from 'react';
import { Center, Text } from '@mantine/core';
import moment from 'moment';
import { EventProps } from 'react-big-calendar';
import { IEvent } from '../../types/interfaces';

const Event = ({ event }: EventProps<IEvent>) => {
    return (
        <>
            <Text fz="xs" fw={700}>
                {moment(event.start).format('HH:mm')} - {moment(event.end).format('HH:mm')}
            </Text>
            <Center>
                <Text>{event.title}</Text>
            </Center>
        </>
    );
};

export default Event;
