import { Textarea, Title, Grid, Divider } from '@mantine/core';
import getNbLines from '../../tools/getLines';
import { IAnamnesis } from '../../interfaces';
import { useAppFormContext } from './formContext';

interface IProps {
    anamnesis: IAnamnesis;
    view?: boolean;
}

const Anamnesis = ({ anamnesis, view }: IProps): JSX.Element => {
    const nbLines = (text: string, base: number) => (view ? getNbLines(text) : base);
    const formContext = useAppFormContext();

    return (
        <div className="debug">
            <Divider my='lg' />
            <Title order={2}>Anamnesis</Title>
            <Grid columns={12}>
                <Grid.Col span={12}>
                    <Textarea
                        label="Reasons for the consultation"
                        maxRows={nbLines(anamnesis.reasons, 1)}
                        defaultValue={view ? anamnesis.reasons : undefined}
                        {...(view ? null : formContext.getInputProps('anamnesis.reasons'))}
                        readOnly={view}
                    />
                </Grid.Col>
                <Grid.Col span={12}>
                    <Textarea
                        label="Symptoms"
                        maxRows={nbLines(anamnesis.symptoms, 3)}
                        defaultValue={view ? anamnesis.symptoms : undefined}
                        {...(view ? null : formContext.getInputProps('anamnesis.symptoms'))}
                        readOnly={view}
                    />
                </Grid.Col>
                <Grid.Col span={6}>
                    <Textarea
                        label="Known diseases"
                        maxRows={nbLines(anamnesis.knownDiseases, 3)}
                        defaultValue={view ? anamnesis.knownDiseases : undefined}
                        {...(view ? null : formContext.getInputProps('anamnesis.knownDiseases'))}
                        readOnly={view}
                    />
                </Grid.Col>
                <Grid.Col span={6}>
                    <Textarea
                        label="Medications"
                        maxRows={nbLines(anamnesis.knownMedications, 3)}
                        defaultValue={view ? anamnesis.knownMedications : undefined}
                        {...(view ? null : formContext.getInputProps('anamnesis.knownMedications'))}
                        readOnly={view}
                    />
                </Grid.Col>
            </Grid>
            <Divider my='lg' />
        </div>
    );
};

export default Anamnesis;
