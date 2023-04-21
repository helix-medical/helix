import React from 'react';
import { Badge, Title } from '@mantine/core';
import { IPassif } from '../../types/interfaces';

interface IProps {
    passif: IPassif;
    color: string;
}

const PreviousAppointments = ({ passif, color }: IProps): JSX.Element => {
    return (
        <>
            <Title order={3}>
                Previous Appointments{' '}
                <Badge color={color} variant="filled" size="md">
                    {passif.lastAppointments.length - 1}
                </Badge>{' '}
                <Badge color={color} radius="sm" variant="filled" size="xl">
                    NOT IMPLEMENTED
                </Badge>
            </Title>
        </>
    );
};

export default PreviousAppointments;
