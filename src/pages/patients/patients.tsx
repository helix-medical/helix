import { useState, useEffect } from 'react';
import axios from 'axios';
import { IconLayoutGrid, IconLayoutList } from '@tabler/icons-react';
import { Button, Badge, Group, Grid, Title, ActionIcon, createStyles } from '@mantine/core';
import PatientItemGrid from './itemGrid';
import ModalAddPatient from './create';
import PatientsTableView from './listView';
import { IPatient } from '../../interfaces';
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
    // Modal for create a patient
    const [show, setShow] = useState(add);
    const toggleModal = () => setShow(!show);

    // View Type
    const [viewType, setViewType] = useState('grid');
    const isGrid: boolean = viewType === 'grid';

    // Fetch all patients
    const [patients, setPatients] = useState<IPatient[]>([]);
    const { classes } = useStyles();
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchAllPatients = async () => {
            try {
                const res = await axios.get(`/api/patients`);
                setPatients(res.data);
            } catch (error: any) {
                if (!error?.response) setNotification(true, 'Network error');
                else setNotification(true, `${error.message}: ${error.response.data.message}`);
                setError(error.response.data.message);
            }
        };
        fetchAllPatients();
    }, [show]);
    const nbPatients = patients.length;

    // Delete a patient
    const handleDelete = async (id: string | undefined) => {
        if (!id) return console.error('No id');
        try {
            const res = await axios.delete(`/api/patients/${id}`);
            setNotification(false, res.data.message);
        } catch (error: any) {
            if (!error?.response) setNotification(true, 'Network error');
            else setNotification(true, `${error.message}: ${error.response.data.message}`);
        }
    };

    const changeView = () => {
        setViewType((currentState) => {
            if (currentState === 'grid') return 'table';
            else return 'grid';
        });
    };

    return (
        <>
            <Grid justify="space-between" align="center" p="md">
                <Group position="left">
                    <Title order={1}>
                        Patients{' '}
                        <Badge size="xl" radius="lg" variant="filled">
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
                    <Button onClick={toggleModal}>New Patient</Button>
                </Group>
            </Grid>
            {error ? (
                <NoContent message={error} title="No Patients Found" />
            ) : (
                <>
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
                </>
            )}
            <ModalAddPatient show={show} toggleModal={toggleModal} />
        </>
    );
};

export default Patients;
