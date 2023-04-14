import { Center, Paper, Text } from '@mantine/core';
import moment from 'moment';
import { EventProps } from 'react-big-calendar';
import { IEvent } from '../../interfaces';

const Event = ({ event }: EventProps<IEvent>) => {
    return (
        <Paper shadow="sm" radius="sm" withBorder>
            <Text fz="xs" color="dimmed">
                {moment(event.start).format('HH:mm')} - {moment(event.end).format('HH:mm')}
            </Text>
            <Center>
                <Text>{event.title}</Text>
            </Center>
        </Paper>
    );
};

export default Event;
