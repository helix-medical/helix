import React from 'react';
import { TextInput, Textarea, Grid } from '@mantine/core';
import getNbLines from '../../tools/get-lines';
import { IPassif, IAppointmentDataView, IAppointmentDataEdit } from '../../types/interfaces';
import cnf from '../../config/config';
import moment from 'moment';

interface IProps {
    patient: IAppointmentDataView | IAppointmentDataEdit;
    view?: boolean;
    passif?: IPassif;
    handler?: (e: { target: { name: any; value: any } }) => void;
    restricted: boolean;
}

const Biodatas = ({ patient, view, passif, handler, restricted }: IProps): JSX.Element => {
    return (
        <Grid columns={12}>
            <Grid.Col sm={6} md={4}>
                <TextInput label="Name" readOnly={view} defaultValue={patient.pName} onChange={handler} name="name" />
            </Grid.Col>
            <Grid.Col sm={6} md={4}>
                <TextInput
                    label="Last Name"
                    readOnly={view}
                    defaultValue={patient.pLastName}
                    onChange={handler}
                    name="lastName"
                />
            </Grid.Col>
            <Grid.Col xs={4} sm={2} md={4}>
                <TextInput label="Sex" readOnly defaultValue={patient.sex} />
            </Grid.Col>
            <Grid.Col xs={8} sm={4} md={4}>
                <TextInput
                    label="Birth Date"
                    defaultValue={
                        patient.birthDate
                            ? view
                                ? moment(patient.birthDate).format(cnf.formatDatePretty)
                                : patient.birthDate
                            : ''
                    }
                    readOnly={view}
                    onChange={handler}
                    name="birthDate"
                />
            </Grid.Col>
            <Grid.Col sm={6} md={4}>
                <TextInput label="Email" defaultValue={patient.email} readOnly={view} onChange={handler} name="email" />
            </Grid.Col>
            <Grid.Col sm={6} md={4}>
                <TextInput label="Phone" defaultValue={patient.phone} readOnly={view} onChange={handler} name="phone" />
            </Grid.Col>
            <Grid.Col sm={6} md={4}>
                <TextInput
                    label="Address"
                    defaultValue={patient.address}
                    readOnly={view}
                    onChange={handler}
                    name="address"
                />
            </Grid.Col>
            <Grid.Col sm={6} md={4}>
                <TextInput label="Job" defaultValue={patient.job} readOnly={view} onChange={handler} name="job" />
            </Grid.Col>
            <Grid.Col sm={6} md={4}>
                <TextInput label="City" defaultValue={patient.city} readOnly={view} onChange={handler} name="city" />
            </Grid.Col>
            {view && passif && !restricted && (
                <>
                    <Grid.Col sm={8}>
                        <Textarea
                            label="Previous Medical Issues"
                            readOnly
                            maxRows={getNbLines(passif.medicalIssues)}
                            defaultValue={passif.medicalIssues}
                        />
                    </Grid.Col>
                    <Grid.Col sm={4}>
                        <TextInput label="Doctor" defaultValue={patient.doctor} />
                    </Grid.Col>
                </>
            )}
        </Grid>
    );
};

export default Biodatas;
