import React from 'react';
import { Textarea, Title, Grid } from '@mantine/core';
import getNbLines from '../../tools/getLines';
import { IAppointmentData } from '../../interfaces';
import { UseFormReturnType } from '@mantine/form';
import { useAppFormContext } from './formContext';

interface IProps {
    appointment: IAppointmentData;
    // handler?: (arg0: any) => void;
    view?: boolean;
    form: UseFormReturnType<IFormValues>;
}

interface IFormValues {
    anamnesis: {
        reasons: string;
        symptoms: string;
        knownDiseases: string;
        knownMedications: string;
    };
    conclusion: {
        diagnosis: string;
        treatment: string;
        observations: string;
    };
}

const Anamnesis = ({ appointment, view, form }: IProps): JSX.Element => {
    // const anamnesis = JSON.parse(appointment.anamnesis);
    // const nbLines = (text: string, base: number) => (view ? getNbLines(text) : base);

    // console.log(form.values);

    const formContext = useAppFormContext();

    return (
        <div className="debug">
            <Title order={2}>Anamnesis</Title>
            <Grid columns={12}>
                <Grid.Col span={12}>
                    <Textarea
                        label="Reasons for the consultation"
                        // maxRows={nbLines(anamnesis.reasons, 1)}
                        // name="reasons"
                        // onChange={handleChange}
                        // defaultValue={form.values.anamnesis.reasons}
                        {...formContext.getInputProps('anamnesis.reasons')}
                        readOnly={view}
                    />
                </Grid.Col>
                <Grid.Col span={12}>
                    <Textarea
                        label="Symptoms"
                        // maxRows={nbLines(anamnesis.symptoms, 3)}
                        // name="symptoms"
                        // onChange={handleChange}
                        // defaultValue={anamnesis.symptoms}
                        {...formContext.getInputProps('anamnesis.symptoms')}
                        readOnly={view}
                    />
                </Grid.Col>
                <Grid.Col span={6}>
                    <Textarea
                        label="Known diseases"
                        // maxRows={nbLines(anamnesis.knownDiseases, 3)}
                        // name="knownDiseases"
                        // onChange={handleChange}
                        // defaultValue={anamnesis.knownDiseases}
                        {...formContext.getInputProps('anamnesis.knownDiseases')}
                        readOnly={view}
                    />
                </Grid.Col>
                <Grid.Col span={6}>
                    <Textarea
                        label="Medications"
                        // maxRows={nbLines(anamnesis.knownMedications, 3)}
                        // name="knownMedications"
                        // onChange={handleChange}
                        // defaultValue={anamnesis.knownMedications}
                        {...formContext.getInputProps('anamnesis.knownMedications')}
                        readOnly={view}
                    />
                </Grid.Col>
            </Grid>
        </div>
    );
};

export default Anamnesis;
