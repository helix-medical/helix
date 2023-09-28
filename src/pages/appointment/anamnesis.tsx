import { Textarea, Title, Grid, Paper } from '@mantine/core';
import nbLines from '../../helpers/get-lines';
import { useAppFormContext } from './form-context';

const Anamnesis = ({ view }: { view: boolean }): JSX.Element => {
    const form = useAppFormContext();

    return (
        <Paper shadow="sm" radius="md" p="lg" withBorder my="lg">
            <Title order={2}>Anamnesis</Title>
            <Grid columns={12}>
                <Grid.Col span={12}>
                    <Textarea
                        label="Reasons for the consultation"
                        maxRows={nbLines(form.values.anamnesis.reasons)}
                        minRows={nbLines(form.values.anamnesis.reasons)}
                        {...form.getInputProps('anamnesis.reasons')}
                        readOnly={view}
                        placeholder="Reasons for the consultation"
                    />
                </Grid.Col>
                <Grid.Col span={12}>
                    <Textarea
                        label="Symptoms"
                        maxRows={nbLines(form.values.anamnesis.symptoms)}
                        minRows={nbLines(form.values.anamnesis.symptoms)}
                        {...form.getInputProps('anamnesis.symptoms')}
                        readOnly={view}
                        placeholder="Symptoms"
                    />
                </Grid.Col>
                <Grid.Col span={12}>
                    <Textarea
                        label="Antécédents sur la zone"
                        maxRows={nbLines(form.values.anamnesis.knownDiseases)}
                        minRows={nbLines(form.values.anamnesis.knownDiseases)}
                        {...form.getInputProps('anamnesis.knownDiseases')}
                        readOnly={view}
                        placeholder="Antécédents sur la zone"
                    />
                </Grid.Col>
            </Grid>
        </Paper>
    );
};

export { Anamnesis };
