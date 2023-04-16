import React from 'react';
import { Badge } from '@mantine/core';

const StateAppointment = ({ state }: { state: string }): JSX.Element => {
    return <Badge color={state === 'pending' ? 'blue' : 'green'}>{state}</Badge>;
};

export default StateAppointment;
