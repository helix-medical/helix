import React from 'react';
import { Badge } from '@mantine/core';

interface IProps {
    kind: string;
}

function KindAppointment({ kind }: IProps): JSX.Element {
    let color = 'blue';
    if (kind === 'follow-up') color = 'indigo';
    if (kind === 'first-visit') color = 'green';
    if (kind === 'emergency') color = 'red';
    if (kind === 'pediatrics') color = 'yellow';
    if (kind === 'maternity') color = 'cyan';

    return (
        <Badge color={color} radius="md" variant="outline">
            {kind}
        </Badge>
    );
}

export default KindAppointment;
