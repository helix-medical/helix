import React from 'react';
import { Badge } from '@mantine/core';

const KindAppointment = ({ kind }: { kind: string }): JSX.Element => {
    let color: string;
    switch (kind) {
        case 'follow-up':
            color = 'indigo';
            break;
        case 'first-visit':
            color = 'green';
            break;
        case 'emergency':
            color = 'red';
            break;
        case 'pediatrics':
            color = 'yellow';
            break;
        case 'maternity':
            color = 'cyan';
            break;
        default:
            color = 'blue';
            break;
    }

    return (
        <Badge color={color} radius="md" variant="outline">
            {kind}
        </Badge>
    );
};

export default KindAppointment;
