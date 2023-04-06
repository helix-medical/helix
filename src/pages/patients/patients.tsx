import { useState, useEffect } from 'react';
import axios from 'axios';
import { IconLayoutGrid, IconLayoutList } from '@tabler/icons-react';
import { Button, Badge, Group, Grid, Title, ActionIcon, createStyles, Burger } from '@mantine/core';
import PatientItemGrid from './itemGrid';
import ModalAddPatient from './create';
import PatientsTableView from './listView';
import { IPatient } from '../../interfaces';
import { useDisclosure } from '@mantine/hooks';
// import NoPatients from "../system/errors/noPatients";

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
    // Fetch all patients
    const [patients, setPatients] = useState<IPatient[]>([]);
    // const [error, setError] = useState<string | null>(null);
    const { classes } = useStyles();
    const [opened, { toggle }] = useDisclosure(false);

    useEffect(() => {
        const fetchAllPatients = async () => {
            try {
                const res = await axios.get(`/api/patients`);
                setPatients(res.data);
                // console.log(res);
            } catch (error: any) {
                if (!error?.response) console.log('Network error');
                else console.log(error.response.data);
                // setError(error.response.data);
            }
        };
        fetchAllPatients();
    }, []);
    const nbPatients = patients.length;

    // Delete a patient
    const handleDelete = async (id: string | undefined) => {
        if (!id) return console.error('No id');
        try {
            await axios.delete(`/api/patients/${id}`);
            window.location.reload();
        } catch (error) {
            console.error(error);
        }
    };

    const handleBurger = () => {
        toggle();
    };

    const changeView = () => {
        setViewType((currentState) => {
            if (currentState === 'grid') return 'table';
            else return 'grid';
        });
    };

    // Modal for create a patient
    const [show, setShow] = useState(false);
    const toggleModal = () => setShow(!show);

    // View Type
    const [viewType, setViewType] = useState('grid');
    const isGrid: boolean = viewType === 'grid';

    return (
        <>
            <Grid justify="space-between" align="center" p="md">
                <Group position="left">
                    <Title order={2}>
                        Patients{' '}
                        <Badge size="lg" radius="lg" variant="filled">
                            {nbPatients}
                        </Badge>
                    </Title>
                </Group>
                <Group position="right">
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
                        New Patient
                    </Button>
                    <Burger opened={opened} className={classes.burger} onClick={handleBurger} />
                    {opened && (
                        <Group position="left" my="md">
                            <ActionIcon color="blue" variant="outline" size="lg" onClick={changeView}>
                                {isGrid ? <IconLayoutList /> : <IconLayoutGrid />}
                            </ActionIcon>
                            <Button onClick={toggleModal}>New Patient</Button>
                        </Group>
                    )}
                </Group>
            </Grid>
            {/* { error && <NoPatients error={error} />} */}
            {isGrid ? (
                <Grid columns={12}>
                    {patients.map((patient: IPatient) => (
                        <Grid.Col xs={6} sm={4} md={3} lg={3} xl={2} key={patient.id}>
                            <PatientItemGrid key={patient.id} patient={patient} handleDelete={handleDelete} />
                        </Grid.Col>
                    ))}
                </Grid>
            ) : (
                <PatientsTableView patients={patients} />
            )}
            <ModalAddPatient show={show} toggleModal={toggleModal} />
        </>
    );
};

export default Patients;
