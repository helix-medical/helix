import { Biodatas } from './biodatas';
import { usePatient } from './patient.logic';
import { PatientNavBar } from './navbar';
import { Grid } from '@mantine/core';
import { PatientAppointments } from './appointments';
import { PatientAccounting } from './accounting';

const Patient = () => {
    const id = window.location.href.split('/').slice(-1)[0];
    const { form, appointments, transactions } = usePatient(id);
    return (
        <>
            <PatientNavBar form={form} />
            <Grid columns={12}>
                <Grid.Col span={8}>
                    <Biodatas form={form} update={false} />
                </Grid.Col>
                <Grid.Col span={4}>
                    <PatientAccounting data={transactions} />
                </Grid.Col>
                <Grid.Col span={12}>
                    <PatientAppointments data={appointments} />
                </Grid.Col>
            </Grid>
        </>
    );
};

export default Patient;
