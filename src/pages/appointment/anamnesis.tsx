import React from 'react';
import { Textarea, Title, Grid, Paper } from '@mantine/core';
import getNbLines from '../../tools/getLines';
import { IAnamnesis } from '../../interfaces';
import { useAppFormContext } from './formContext';

interface IProps {
    anamnesis: IAnamnesis;
    view?: boolean;
}

const Anamnesis = ({ anamnesis, view }: IProps): JSX.Element => {
    const nbLines = (text: string, base: number) => (view ? getNbLines(text) : base);
    const form = useAppFormContext();

    return (
        <Paper shadow="sm" radius="md" p="lg" withBorder my="lg">
            <Title order={2}>Anamnesis</Title>
            <Grid columns={12}>
                <Grid.Col span={12}>
                    <Textarea
                        label="Reasons for the consultation"
                        maxRows={nbLines(anamnesis.reasons, 1)}
                        minRows={nbLines(anamnesis.reasons, 1)}
                        defaultValue={view ? anamnesis.reasons : undefined}
                        {...(view ? null : form.getInputProps('anamnesis.reasons'))}
                        readOnly={view}
                    />
                </Grid.Col>
                <Grid.Col span={12}>
                    <Textarea
                        label="Symptoms"
                        maxRows={nbLines(anamnesis.symptoms, 3)}
                        minRows={nbLines(anamnesis.symptoms, 1)}
                        defaultValue={view ? anamnesis.symptoms : undefined}
                        {...(view ? null : form.getInputProps('anamnesis.symptoms'))}
                        readOnly={view}
                    />
                </Grid.Col>
                <Grid.Col span={12}>
                    <Textarea
                        label="Antécédents sur la zone"
                        maxRows={nbLines(anamnesis.knownDiseases, 3)}
                        minRows={nbLines(anamnesis.knownDiseases, 1)}
                        defaultValue={view ? anamnesis.knownDiseases : undefined}
                        {...(view ? null : form.getInputProps('anamnesis.knownDiseases'))}
                        readOnly={view}
                    />
                </Grid.Col>
            </Grid>
        </Paper>
    );
};

export default Anamnesis;
