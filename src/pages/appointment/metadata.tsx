import { TextInput, Title, Grid, Paper } from '@mantine/core';
import { IAppointmentDataView, IAppointmentDataEdit } from '../../interfaces';

interface IProps {
    appointment: IAppointmentDataView | IAppointmentDataEdit;
}

function Metadata({ appointment }: IProps): JSX.Element {
    return (
        <Paper shadow="sm" radius="md" p="lg" withBorder my="lg">
            <Title order={2}>Appointment Data</Title>
            <Grid>
                <Grid.Col span={4}>
                    <TextInput label="Date" readOnly defaultValue={appointment.date} />
                </Grid.Col>
                <Grid.Col span={4}>
                    <TextInput label="Kind" readOnly defaultValue={appointment.reasons} />
                </Grid.Col>
                <Grid.Col span={4}>
                    <TextInput label="Patient ID" readOnly defaultValue={appointment.patientId} />
                </Grid.Col>
            </Grid>
        </Paper>
    );
}

export default Metadata;
