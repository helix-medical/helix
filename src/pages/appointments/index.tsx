import React, { useState, useEffect } from 'react';
import {
    Button,
    Badge,
    Group,
    Grid,
    Title,
    ActionIcon,
    createStyles,
    Burger,
    Paper,
    Tooltip,
    SegmentedControl,
    useMantineTheme,
} from '@mantine/core';
import { IconLayoutGrid, IconLayoutList } from '@tabler/icons-react';
import AppItemGrid from './item-grid';
import AppTableView from './list-view';
import ModalCreateApp from './create';
import { IAppointmentExtended } from '../../interfaces';

import { useDisclosure } from '@mantine/hooks';
import setNotification from '../system/errors/feedback-notif';
import NoContent from '../system/errors/no-content';
import useSecureAPI from '../../hooks/use-secure-api';

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
    const api = useSecureAPI();
    // Modal
    const [show, setShow] = useState(add);
    const toggleModal = () => setShow(!show);
    const [mainColor, setMainColor] = useState('fr-yellow.4');
    const theme = useMantineTheme();
    useEffect(() => {
        setMainColor(theme.colorScheme === 'dark' ? 'fr-orange.6' : 'fr-orange.4');
    }, [theme.colorScheme]);

    // View Type
    const [viewType, setViewType] = useState('grid');
    const isGrid = viewType === 'grid';

    const { classes } = useStyles();
    const [opened, { toggle }] = useDisclosure(false);
    const [error, setError] = useState<string | null>(null);

    const [period, setPeriod] = useState('all');

    // fetch all appointments
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        const fetchAllAppointments = async () => {
            try {
                const res = await api.get(`/appointments/${period}`);
                setAppointments(res.data);
                setError(null);
            } catch (error: any) {
                if (!error?.response) setNotification(true, 'Network error');
                else if (error.response.status !== 404)
                    setNotification(true, `${error.message}: ${error.response.data.message}`);
                setError(error.response.data.message);
            }
        };
        fetchAllAppointments();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [period, show]);
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
                        <Badge size="xl" radius="lg" variant="filled" color={mainColor}>
                            {nbAppointments}
                        </Badge>
                    </Title>
                </Group>
                <Group>
                    <SegmentedControl
                        value={period}
                        onChange={(value) => setPeriod(value)}
                        data={[
                            { label: 'Past', value: 'past' },
                            { label: 'All', value: 'all' },
                            { label: 'Upcoming', value: 'upcoming' },
                        ]}
                        color={mainColor}
                    />

                    <Tooltip label={isGrid ? 'Table' : 'Grid'} withArrow position="bottom" color={mainColor}>
                        <ActionIcon
                            color={mainColor}
                            variant="outline"
                            size="lg"
                            onClick={changeView}
                            className={classes.button}
                        >
                            {isGrid ? <IconLayoutList /> : <IconLayoutGrid />}
                        </ActionIcon>
                    </Tooltip>
                    <Button onClick={toggleModal} className={classes.button} color={mainColor}>
                        New Appointment
                    </Button>
                    <Burger opened={opened} className={classes.burger} onClick={toggle} />
                    {opened && (
                        <Button onClick={toggleModal} color={mainColor}>
                            New Appointment
                        </Button>
                    )}
                </Group>
            </Grid>
            {error ? (
                <NoContent message={error} title="Error while getting Appointments" />
            ) : (
                <Paper shadow="sm" radius="md" p="lg" withBorder my="lg">
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
                </Paper>
            )}
            {show && <ModalCreateApp show={show} toggleModal={toggleModal} />}
        </>
    );
};

export default Patients;
