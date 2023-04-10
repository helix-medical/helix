import { TextInput, Textarea, Grid } from '@mantine/core';
import getNbLines from '../../tools/getLines';
import { IPassif, IAppointmentDataView, IAppointmentDataEdit } from '../../interfaces';

interface IProps {
    patient: IAppointmentDataView | IAppointmentDataEdit;
    view?: boolean;
    passif?: IPassif;
    handler?: (e: { target: { name: any; value: any } }) => void;
}

const Biodatas = ({ patient, view, passif, handler }: IProps): JSX.Element => {
    return (
        <Grid columns={12}>
            <Grid.Col span={4}>
                <TextInput label="Name" readOnly={view} defaultValue={patient.pName} onChange={handler} name="name" />
            </Grid.Col>
            <Grid.Col span={4}>
                <TextInput
                    label="Last Name"
                    readOnly={view}
                    defaultValue={patient.pLastName}
                    onChange={handler}
                    name="lastName"
                />
            </Grid.Col>
            <Grid.Col span={4}>
                <TextInput label="Sex" readOnly defaultValue={patient.sex} />
            </Grid.Col>
            <Grid.Col span={4}>
                <TextInput
                    label="Birth Date"
                    defaultValue={patient.birthDate}
                    readOnly={view}
                    onChange={handler}
                    name="birthDate"
                />
            </Grid.Col>
            <Grid.Col span={4}>
                <TextInput label="Email" defaultValue={patient.email} readOnly={view} onChange={handler} name="email" />
            </Grid.Col>
            <Grid.Col span={4}>
                <TextInput label="City" defaultValue={patient.city} readOnly={view} onChange={handler} name="city" />
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
    );
};

export default Biodatas;
