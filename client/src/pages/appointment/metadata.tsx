import React from "react";
import { TextInput, Title, Grid } from "@mantine/core";
import dateToReadable from "../../tools/date";
import { IAppointmentData } from "../../interfaces";

interface IProps {
    appointment: IAppointmentData;
}

function Metadata({ appointment }: IProps): JSX.Element {
    return (
        <>
            <Title order={2}>Appointment Data</Title>
            <Grid>
                <Grid.Col span={4}>
                    <TextInput label="Date" readOnly defaultValue={dateToReadable(appointment.date)} />
                </Grid.Col>
                <Grid.Col span={4}>
                    <TextInput label="Kind" readOnly defaultValue={appointment.reasons} />
                </Grid.Col>
                <Grid.Col span={4}>
                    <TextInput label="Patient ID" readOnly defaultValue={appointment.patientId} />
                </Grid.Col>
            </Grid>
        </>
    );
};

export default Metadata;