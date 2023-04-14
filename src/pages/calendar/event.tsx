import { Center, Paper, Text, createStyles } from '@mantine/core';
import moment from 'moment';
import { EventProps } from 'react-big-calendar';
import { IEvent } from '../../interfaces';

const useStyles = createStyles((theme) => ({
    firstVisit: {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.green[5] : theme.colors.green[6],
        color: 'white',
    },
    followUp: {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.red[5] : theme.colors.red[6],
        color: 'white',
    },
}));

const Event = ({ event }: EventProps<IEvent>) => {
    const { classes } = useStyles();
    let style = classes.firstVisit;
    if (event.kind === 'event') {
        style = classes.followUp;
    }

    return (
        <Paper shadow="sm" radius="sm" withBorder className={style} pb="sm">
            <Text fz="xs" fw={700}>
                {moment(event.start).format('HH:mm')} - {moment(event.end).format('HH:mm')}
            </Text>
            <Center>
                <Text>{event.title}</Text>
            </Center>
        </Paper>
    );
};

export default Event;
