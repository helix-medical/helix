import React from 'react';
import { Badge } from '@mantine/core';

const IdBadge = ({ id, color }: { id: string; color?: string }): JSX.Element => {
    return (
        <Badge color={color ?? 'gray'} variant="dot" size="md">
            {id}
        </Badge>
    );
};

export default IdBadge;
