import { Textarea, Title, Grid, TextInput, Paper } from '@mantine/core';
import getNbLines from '../../tools/getLines';
import { IConclusion } from '../../interfaces';
import { useAppFormContext } from './formContext';

interface IProps {
    conclusion: IConclusion;
    view?: boolean;
}

function Conclusion({ conclusion, view }: IProps): JSX.Element {
    const nbLines = (text: string, base: number) => (view ? getNbLines(text) : base);
    const formContext = useAppFormContext();

    return (
        <Paper shadow="sm" radius="md" p="lg" withBorder my='lg'>
            <Title order={2}>Conclusion</Title>
            <Grid columns={12}>
                <Grid.Col span={12}>
                    <TextInput
                        label="Diagnosis"
                        defaultValue={view ? conclusion.diagnosis : undefined}
                        {...(view ? null : formContext.getInputProps('conclusion.diagnosis'))}
                        readOnly={view}
                    />
                </Grid.Col>
                <Grid.Col span={12}>
                    <Textarea
                        label="Treatment"
                        maxRows={nbLines(conclusion.treatment, 3)}
                        defaultValue={view ? conclusion.treatment : undefined}
                        {...(view ? null : formContext.getInputProps('conclusion.treatment'))}
                        readOnly={view}
                    />
                </Grid.Col>
                <Grid.Col span={12}>
                    <Textarea
                        label="Observations"
                        maxRows={nbLines(conclusion.observations, 3)}
                        defaultValue={view ? conclusion.observations : undefined}
                        {...(view ? null : formContext.getInputProps('conclusion.observations'))}
                        readOnly={view}
                    />
                </Grid.Col>
            </Grid>
        </Paper>
    );
}

export default Conclusion;
