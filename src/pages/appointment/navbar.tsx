import React from 'react';
import { Button, Badge, Title, Grid, Group, createStyles } from '@mantine/core';

interface IProps {
    view?: boolean;
    color: string;
    handler?: () => void;
}

const useStyles = createStyles((theme) => ({
    useless: {
        [theme.fn.smallerThan('xs')]: {
            display: 'none',
        },
    },
}));

const NavBarAppointment = ({ view, color, handler }: IProps): JSX.Element => {
    const { classes: style } = useStyles();
    return (
        <Grid justify="space-between" align="center" p="md">
            <Group>
                <Title order={1}>
                    Appointment{' '}
                    <Badge color={view ? 'red' : 'green'} size="xl" radius="sm" className={style.useless}>
                        {view ? 'READONLY' : 'CAN EDIT'}
                    </Badge>
                </Title>
            </Group>
            <Group>
                {view && (
                    <Button onClick={handler} color={color}>
                        Export to PDF
                    </Button>
                )}
            </Group>
        </Grid>
    );
};

export default NavBarAppointment;
