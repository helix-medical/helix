import { TextInput, Title, Grid, Paper } from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';
import { IAppointmentData } from './types';

const Metadata = ({ data }: { data: UseFormReturnType<IAppointmentData> }): JSX.Element => (
    <Paper shadow="sm" radius="md" p="lg" withBorder my="lg">
        <Title order={2}>Appointment Data</Title>
        <Grid columns={12}>
            <Grid.Col xs={6} sm={3} md={3}>
                <TextInput label="Date" readOnly defaultValue={data.values.date} />
            </Grid.Col>
            <Grid.Col xs={6} sm={3} md={3}>
                <TextInput label="Kind" readOnly {...data.getInputProps('kind')} />
            </Grid.Col>
            <Grid.Col xs={6} sm={3} md={3}>
                <TextInput label="Patient ID" readOnly defaultValue={data.values.patientID.toUpperCase()} />
            </Grid.Col>
            <Grid.Col xs={6} sm={3} md={3}>
                <TextInput label="Practitioner" readOnly defaultValue={data.values.practitionerName} />
            </Grid.Col>
        </Grid>
    </Paper>
);

export { Metadata };
