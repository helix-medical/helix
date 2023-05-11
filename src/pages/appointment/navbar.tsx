import React from 'react';
import { Button, Badge, Title, Grid, Group } from '@mantine/core';
import { AppointmentStyles } from './styles';

interface IProps {
    view?: boolean;
    color: string;
    handler?: () => void;
}

const NavBarAppointment = ({ view, color, handler }: IProps): JSX.Element => {
    const { classes } = AppointmentStyles();

    return (
        <Grid justify="space-between" align="center" p="md">
            <Group>
                <Title order={1}>
                    Appointment{' '}
                    <Badge color={view ? 'red' : 'green'} size="xl" radius="sm" className={classes.useless}>
                        {view ? 'READONLY' : 'CAN EDIT'}
                    </Badge>
                </Title>
            </Group>
            <Group>
                {view ? (
                    <Button onClick={handler} color={color}>
                        Export to PDF
                    </Button>
                ) : null}
            </Group>
        </Grid>
    );
};

export { NavBarAppointment };
