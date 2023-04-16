import React from 'react';
import { Badge } from '@mantine/core';

const PaymentMethod = ({ method }: { method: string }): JSX.Element => {
    let color = 'blue';
    if (method === 'cash') color = 'green';
    if (method === 'check') color = 'yellow';
    if (method === 'card') color = 'cyan';

    return (
        <Badge color={color} radius="md" variant="outline">
            {method}
        </Badge>
    );
};

export default PaymentMethod;
