import React from 'react';
import { Textarea, Title, Grid, TextInput } from '@mantine/core';
import getNbLines from '../../tools/getLines';
import { IAppointmentData } from '../../interfaces';

interface IProps {
    appointment: IAppointmentData;
    view?: boolean;
    form: any;
}

function Conclusion({ appointment, view, form }: IProps): JSX.Element {
    const conclusion = JSON.parse(appointment.conclusion);
    const nbLines = (text: string, base: number) => (view ? getNbLines(text) : base);

    return (
        <>
            <Title order={2}>Conclusion</Title>
            <Grid columns={12}>
                <Grid.Col span={12}>
                    <TextInput label="Diagnosis" {...form.getInputProps('conclusion.diagnosis')} readOnly={view} />
                </Grid.Col>
                <Grid.Col span={12}>
                    <Textarea
                        label="Treatment"
                        maxRows={nbLines(conclusion.treatment, 3)}
                        {...form.getInputProps('conclusion.treatment')}
                        readOnly={view}
                    />
                </Grid.Col>
                <Grid.Col span={6}>
                    <Textarea
                        label="Observations"
                        maxRows={nbLines(conclusion.observations, 3)}
                        {...form.getInputProps('conclusion.observations')}
                        readOnly={view}
                    />
                </Grid.Col>
            </Grid>
        </>
    );
}

export default Conclusion;
