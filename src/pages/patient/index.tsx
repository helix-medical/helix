import { Biodatas } from './biodatas';
import { usePatient } from './patient.logic';
import { PatientNavBar } from './navbar';
import { Grid, Paper } from '@mantine/core';
import { PatientAppointments } from './appointments';

const Patient = () => {
    const id = window.location.href.split('/').slice(-1)[0];
    const { form } = usePatient(id);
    return (
        <>
            <PatientNavBar form={form} />
            <Grid columns={12}>
                <Grid.Col span={8}>
                    <Biodatas form={form} update={false} />
                </Grid.Col>
                <Grid.Col span={4}>
                    <Paper shadow="md" p="md" radius="md" withBorder>
                        <div>TODO: Patient's accounting</div>
                    </Paper>
                </Grid.Col>
                <Grid.Col span={12}>
                    <PatientAppointments id={id} />
                </Grid.Col>
            </Grid>
        </>
    );
};

export default Patient;
