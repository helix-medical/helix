import React, { useState, useEffect } from 'react';
import { IconLayoutGrid, IconLayoutList } from '@tabler/icons-react';
import {
    ActionIcon,
    Badge,
    Button,
    Grid,
    Group,
    LoadingOverlay,
    Paper,
    Title,
    Tooltip,
    useMantineTheme,
} from '@mantine/core';
import PatientItemGrid from './item-grid';
import ModalAddPatient from './create';
import PatientsTableView from './list-view';
import { IPatient } from '../../types/interfaces';
import NoContent from '../../components/errors/no-content';
import Styles from './patients.styles';
import useComponentLogic from './index.logic';

const Patients = ({ add }: { add: boolean }): JSX.Element => {
    const [mainColor, setMainColor] = useState('fr-yellow.4');
    const theme = useMantineTheme();
    const { classes } = Styles();
    const { patients, error, handleDelete, changeView, isGrid, show, nbPatients, toggleModal } = useComponentLogic(add);

    useEffect(() => {
        setMainColor(theme.colorScheme === 'dark' ? 'fr-yellow.6' : 'fr-yellow.4');
    }, [theme.colorScheme]);

    return (
        <>
            <Grid justify="space-between" align="center" p="md">
                <Group position="left">
                    <Title order={1}>
                        Patients{' '}
                        <Badge size="xl" radius="lg" variant="filled" color={mainColor}>
                            {nbPatients}
                        </Badge>
                    </Title>
                </Group>
                <Group position="right">
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
                    <Button onClick={toggleModal} color={mainColor}>
                        New Patient
                    </Button>
                </Group>
            </Grid>
            {error ? (
                <NoContent message={error} title="Error while getting Patients" />
            ) : nbPatients === 0 ? (
                <LoadingOverlay visible={true} />
            ) : (
                <Paper shadow="sm" radius="md" p="lg" withBorder my="lg">
                    {isGrid ? (
                        <Grid columns={12}>
                            {patients.map((patient: IPatient) => (
                                <Grid.Col xs={6} sm={4} md={3} lg={3} xl={2} key={patient.id}>
                                    <PatientItemGrid key={patient.id} patient={patient} handleDelete={handleDelete} />
                                </Grid.Col>
                            ))}
                        </Grid>
                    ) : (
                        <PatientsTableView patients={patients} handleDelete={handleDelete} />
                    )}
                </Paper>
            )}
            <ModalAddPatient show={show} toggleModal={toggleModal} />
        </>
    );
};

export default Patients;
