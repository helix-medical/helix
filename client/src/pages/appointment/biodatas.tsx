import React from 'react';
import { TextInput, Textarea, Grid, Select } from '@mantine/core';
import getNbLines from '../../tools/getLines';
import { IPassif, IAppointmentData } from '../../interfaces';
import { UseFormReturnType } from '@mantine/form/lib/types';
// import { useForm } from '@mantine/form';

interface IProps {
    patient: IAppointmentData;
    form:
        | UseFormReturnType<
              {
                  name: string;
                  lastName: string;
                  birthDate: string;
                  sex: string;
                  email: string;
                  city: string;
                  medicalIssues: any;
              },
              (values: {
                  name: string;
                  lastName: string;
                  birthDate: string;
                  sex: string;
                  email: string;
                  city: string;
                  medicalIssues: any;
              }) => {
                  name: string;
                  lastName: string;
                  birthDate: string;
                  sex: string;
                  email: string;
                  city: string;
                  medicalIssues: any;
              }
          >
        | any;
    view?: boolean;
    passif?: IPassif;
}

const Biodatas = ({ patient, form, view, passif }: IProps): JSX.Element => {
    // console.log(form.values);

    return (
        // <form>
        <Grid columns={12}>
            <Grid.Col span={4}>
                <TextInput label="Name" readOnly={view} />
            </Grid.Col>
            <Grid.Col span={4}>
                <TextInput label="Last Name" readOnly={view} />
            </Grid.Col>
            <Grid.Col span={4}>
                {view ? (
                    <TextInput label="Sex" readOnly defaultValue={patient.sex} />
                ) : (
                    <Select label="Sex" placeholder={patient.sex} data={['F', 'M']} />
                )}
            </Grid.Col>
            <Grid.Col span={4}>
                <TextInput label="Birth Date" defaultValue={patient.birthDate} readOnly={view} />
            </Grid.Col>
            <Grid.Col span={4}>
                <TextInput label="Email" defaultValue={patient.email} readOnly={view} />
            </Grid.Col>
            <Grid.Col span={4}>
                <TextInput label="City" defaultValue={patient.city} readOnly={view} />
            </Grid.Col>
            {view && passif && (
                <Grid.Col span={12}>
                    <Textarea
                        label="Previous Medical Issues"
                        readOnly
                        maxRows={getNbLines(passif.medicalIssues)}
                        defaultValue={passif.medicalIssues}
                    />
                </Grid.Col>
            )}
        </Grid>
        // </form>
    );
};

export default Biodatas;
