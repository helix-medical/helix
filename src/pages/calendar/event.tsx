import { Button } from '@mantine/core';
import moment from 'moment';
import { EventProps } from 'react-big-calendar';

interface IEvent {
    start: Date;
    end: Date;
    title: string;
    id: string;
}

const Event = ({ event }: EventProps<IEvent>) => {
    return (
        <>
            <Button>{moment(event.start).format('HH:mm')}</Button>
            <Button color="blue">{event.title}</Button>
        </>
    );
};

export default Event;
