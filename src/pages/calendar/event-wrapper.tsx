import React from 'react';
import { EventWrapperProps, momentLocalizer } from 'react-big-calendar';
import Event from './event';
import moment from 'moment';
import { IEvent } from '../../types/interfaces';

const EventWrapper = ({ event, continuesEarlier, continuesLater }: EventWrapperProps<IEvent>) => {
    return (
        <>
            <Event
                event={event}
                continuesAfter={continuesLater}
                continuesPrior={continuesEarlier}
                slotEnd={event.end}
                slotStart={event.start}
                title={event.title}
                isAllDay={false}
                localizer={momentLocalizer(moment)}
            />
        </>
    );
};

export default EventWrapper;
