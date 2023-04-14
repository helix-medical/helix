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
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.blue[5] : theme.colors.blue[6],
        color: 'white',
    },
    emergency: {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.red[5] : theme.colors.red[6],
        color: 'black',
    },
    pediatrics: {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.yellow[5] : theme.colors.yellow[6],
        color: 'black',
    },
    maternity: {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.violet[5] : theme.colors.violet[6],
        color: 'black',
    },
}));

const Event = ({ event }: EventProps<IEvent>) => {
    const { classes } = useStyles();
    let style = classes.firstVisit;
    if (event.kind === 'follow-up') {
        style = classes.followUp;
    } else if (event.kind === 'emergency') {
        style = classes.emergency;
    } else if (event.kind === 'pediatrics') {
        style = classes.pediatrics;
    } else if (event.kind === 'maternity') {
        style = classes.maternity;
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
