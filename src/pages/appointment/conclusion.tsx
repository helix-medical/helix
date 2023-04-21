import React from 'react';
import { Textarea, Title, Grid, TextInput, Paper } from '@mantine/core';
import getNbLines from '../../tools/get-lines';
import { IConclusion } from '../../types/interfaces';
import { useAppFormContext } from './form-context';

interface IProps {
    conclusion: IConclusion;
    view?: boolean;
}

const Conclusion = ({ conclusion, view }: IProps): JSX.Element => {
    const nbLines = (text: string, base: number) => (view ? getNbLines(text) : base);
    const form = useAppFormContext();

    return (
        <Paper shadow="sm" radius="md" p="lg" withBorder my="lg">
            <Title order={2}>Conclusion</Title>
            <Grid columns={12}>
                <Grid.Col span={12}>
                    <TextInput
                        label="Diagnosis"
                        defaultValue={view ? conclusion.diagnosis : undefined}
                        {...(view ? null : form.getInputProps('conclusion.diagnosis'))}
                        readOnly={view}
                    />
                </Grid.Col>
                <Grid.Col span={12}>
                    <Textarea
                        label="Treatment"
                        maxRows={nbLines(conclusion.treatment, 3)}
                        minRows={nbLines(conclusion.treatment, 1)}
                        defaultValue={view ? conclusion.treatment : undefined}
                        {...(view ? null : form.getInputProps('conclusion.treatment'))}
                        readOnly={view}
                    />
                </Grid.Col>
                <Grid.Col span={12}>
                    <Textarea
                        label="Conseils"
                        maxRows={nbLines(conclusion.observations, 3)}
                        minRows={nbLines(conclusion.observations, 1)}
                        defaultValue={view ? conclusion.observations : undefined}
                        {...(view ? null : form.getInputProps('conclusion.observations'))}
                        readOnly={view}
                    />
                </Grid.Col>
            </Grid>
        </Paper>
    );
};

export default Conclusion;
