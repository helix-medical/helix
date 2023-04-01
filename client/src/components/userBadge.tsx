import React from 'react';
import { Badge } from '@mantine/core';

interface IProps {
    role: string;
}

const RoleBadge = ({ role }: IProps) => {
    let color = 'blue';
    if (role === 'admin') color = 'red';
    if (role === 'practitioner') color = 'green';
    if (role === 'secretary') color = 'yellow';

    return (
        <Badge variant="light" radius="md" color={color}>
            {role}
        </Badge>
    );
};

export default RoleBadge;
