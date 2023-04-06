import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';

import { IconLayoutGrid, IconLayoutList } from '@tabler/icons-react';

import AppItemGrid from './itemGrid';
import AppTableView from './listView';
import ModalCreateApp from './create';
import { IAppointmentExtended } from '../../interfaces';
import { Button, Badge, Group, Grid, Title, ActionIcon, createStyles, Burger } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

const useStyles = createStyles((theme) => ({
    button: {
        [theme.fn.smallerThan('xs')]: {
            display: 'none',
        },
    },

    burger: {
        [theme.fn.largerThan('xs')]: {
            display: 'none',
        },
    },
}));

const Patients = (): JSX.Element => {
    const { classes } = useStyles();
    const [opened, { toggle }] = useDisclosure(false);

    // fetch all appointments
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        const fetchAllAppointments = async () => {
            try {
                const res = await axios.get('/api/appointments');
                setAppointments(res.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchAllAppointments();
    }, []);
    const nbAppointments = appointments.length;

    const changeView = () => {
        setViewType((currentState) => {
            if (currentState === 'grid') return 'table';
            else return 'grid';
        });
    };

    const handleBurger = () => {
        toggle();
    };

    // Modal
    const [show, setShow] = useState(false);
    const toggleModal = () => setShow(!show);

    // View Type
    const [viewType, setViewType] = useState('grid');
    const isGrid = viewType === 'grid';

    return (
        <>
            <Grid justify="space-between" align="center" p="md">
                <Group>
                    <Title order={2}>
                        Appointments{' '}
                        <Badge size="lg" radius="lg" variant="filled">
                            {nbAppointments}
                        </Badge>
                    </Title>
                </Group>
                <Group>
                    <ActionIcon
                        color="blue"
                        variant="outline"
                        size="lg"
                        onClick={changeView}
                        className={classes.button}
                    >
                        {isGrid ? <IconLayoutList /> : <IconLayoutGrid />}
                    </ActionIcon>
                    <Button onClick={toggleModal} className={classes.button}>
                        New Appointment
                    </Button>
                    <Burger opened={opened} className={classes.burger} onClick={handleBurger} />
                    {opened && (
                        <Group position="left" my="md">
                            <ActionIcon color="blue" variant="outline" size="lg" onClick={changeView}>
                                {isGrid ? <IconLayoutList /> : <IconLayoutGrid />}
                            </ActionIcon>
                            <Button onClick={toggleModal}>New Appointment</Button>
                        </Group>
                    )}
                </Group>
            </Grid>
            {isGrid ? (
                <Grid columns={12}>
                    {appointments.map((appointment: IAppointmentExtended) => (
                        <Grid.Col xs={6} sm={4} md={3} lg={3} xl={2} key={appointment.id}>
                            <AppItemGrid key={appointment.id} appointment={appointment} />
                        </Grid.Col>
                    ))}
                </Grid>
            ) : (
                <AppTableView appointments={appointments} />
            )}
            <ModalCreateApp show={show} toggleModal={toggleModal} />
        </>
    );
};

export default Patients;
