import axios from 'axios';
import { useState, useEffect } from 'react';
import { Button, Badge, Group, Grid, Title, ActionIcon, createStyles, Burger } from '@mantine/core';
import { IconLayoutGrid, IconLayoutList } from '@tabler/icons-react';
import AppItemGrid from './itemGrid';
import AppTableView from './listView';
import ModalCreateApp from './create';
import { IAppointmentExtended } from '../../interfaces';

import { useDisclosure } from '@mantine/hooks';
import setNotification from '../system/errors/feedbackNotif';
import NoContent from '../system/errors/noContent';

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

const Patients = ({ add }: { add: boolean }): JSX.Element => {
    // Modal
    const [show, setShow] = useState(add);
    const toggleModal = () => setShow(!show);

    // View Type
    const [viewType, setViewType] = useState('grid');
    const isGrid = viewType === 'grid';

    const { classes } = useStyles();
    const [opened, { toggle }] = useDisclosure(false);
    const [error, setError] = useState<string | null>(null);

    // fetch all appointments
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        const fetchAllAppointments = async () => {
            try {
                const res = await axios.get('/api/appointments');
                if (res.data.length === 0) setError('No Appointments Found');
                else setAppointments(res.data);
            } catch (error: any) {
                if (!error?.response) setNotification(true, 'Network error');
                else setNotification(true, `${error.message}: ${error.response.data.message}`);
                setError(error.response.data.message);
            }
        };
        fetchAllAppointments();
    }, [show]);
    const nbAppointments = appointments.length;

    const changeView = () => {
        setViewType((currentState) => {
            if (currentState === 'grid') return 'table';
            else return 'grid';
        });
    };

    return (
        <>
            <Grid justify="space-between" align="center" p="md">
                <Group>
                    <Title order={1}>
                        Appointments{' '}
                        <Badge size="xl" radius="lg" variant="filled">
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
                    <Burger opened={opened} className={classes.burger} onClick={toggle} />
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
            {error ? (
                <NoContent message={error} title="No Appointments Found" />
            ) : (
                <>
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
                </>
            )}
            <ModalCreateApp show={show} toggleModal={toggleModal} />
        </>
    );
};

export default Patients;
