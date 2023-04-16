import React from 'react';
import { Badge } from '@mantine/core';

const UserStatus = ({ status }: { status: string }): JSX.Element => {
    let color: string;
    switch (status) {
        case 'disabled':
            color = 'gray';
            break;
        case 'first-time':
            color = 'green';
            break;
        default:
            color = 'cyan';
            break;
    }
    return (
        <Badge radius="md" variant="outline" color={color}>
            {status}
        </Badge>
    );
};

export default UserStatus;
