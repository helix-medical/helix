import { Biodatas } from './biodatas';
import { Grid } from '@mantine/core';
import { PatientAccounting } from './accounting';
import { PatientAppointments } from './appointments';
import { PatientNavBar } from './header.tsx';
import { PatientProvider } from './context';
import { usePatient } from './logic';

const Patient = () => {
  const id = window.location.href.split('/').slice(-1)[0];
  const { form, appointments, transactions } = usePatient(id);
  return (
    <PatientProvider>
      <Grid columns={12}>
        <PatientNavBar form={form} />
        <Grid.Col span={8}>
          <Biodatas form={form} />
        </Grid.Col>
        <Grid.Col span={4}>
          <PatientAccounting data={transactions} />
        </Grid.Col>
        <Grid.Col span={12}>
          <PatientAppointments data={appointments} />
        </Grid.Col>
      </Grid>
    </PatientProvider>
  );
};

export default Patient;
