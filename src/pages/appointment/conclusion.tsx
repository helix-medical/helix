import React from 'react';
import { Textarea, Title, Grid, Paper } from '@mantine/core';
import nbLines from '../../helpers/get-lines';
import { useAppFormContext } from './form-context';

const Conclusion = ({ view }: { view: boolean }): JSX.Element => {
    const form = useAppFormContext();

    return (
        <Paper shadow="sm" radius="md" p="lg" withBorder my="lg">
            <Title order={2}>Conclusion</Title>
            <Grid columns={12}>
                <Grid.Col span={12}>
                    <Textarea
                        label="Diagnosis"
                        {...form.getInputProps('conclusion.diagnosis')}
                        placeholder="Diagnosis"
                        readOnly={view}
                        maxRows={nbLines(form.values.conclusion.diagnosis)}
                        minRows={nbLines(form.values.conclusion.diagnosis)}
                    />
                </Grid.Col>
                <Grid.Col span={12}>
                    <Textarea
                        label="Treatment"
                        maxRows={nbLines(form.values.conclusion.treatment)}
                        minRows={nbLines(form.values.conclusion.treatment)}
                        {...form.getInputProps('conclusion.treatment')}
                        placeholder="Treatment"
                        readOnly={view}
                    />
                </Grid.Col>
                <Grid.Col span={12}>
                    <Textarea
                        label="Conseils"
                        maxRows={nbLines(form.values.conclusion.observations)}
                        minRows={nbLines(form.values.conclusion.observations)}
                        {...form.getInputProps('conclusion.observations')}
                        placeholder="Conseils"
                        readOnly={view}
                    />
                </Grid.Col>
            </Grid>
        </Paper>
    );
};

export { Conclusion };
