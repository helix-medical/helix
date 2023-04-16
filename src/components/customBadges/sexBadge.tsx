import React from 'react';
import { Badge } from '@mantine/core';

const SexBadge = ({ sex }: { sex: string }) => {
    return (
        <Badge variant="outline" color={sex === 'F' ? 'pink' : 'blue'}>
            {sex}
        </Badge>
    );
};

export default SexBadge;
