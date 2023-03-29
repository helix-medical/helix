import React from "react";
import { TextInput, Textarea, Grid, Select } from "@mantine/core";
import getNbLines from "../../tools/getLines";
import { IPassif, IAppointmentData } from "../../interfaces";

interface IProps {
    patient: IAppointmentData,
    handler?: (arg0: any) => void,
    view?: boolean,
    passif?: IPassif
}

const Biodatas = ({ patient, handler, view, passif }: IProps): JSX.Element => {
    const handleChange = (e: { target: { name: any; value: any; }; }) => {
        if (handler)
            handler((prev: any) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    return (
        <Grid columns={12}>
            <Grid.Col span={4}>
                <TextInput label="Name" defaultValue={patient.name} name="name" onChange={handleChange} readOnly={view} />
            </Grid.Col>
            <Grid.Col span={4}>
                <TextInput label='Last Name' defaultValue={patient.lastName} name="lastName" onChange={handleChange} readOnly={view} />
            </Grid.Col>
            <Grid.Col span={4}>
                {
                    view
                        ? <TextInput label="Sex" readOnly defaultValue={patient.sex} />
                        : <Select label="Sex" placeholder={patient.sex} name="sex" /*onChange={handleChange}*/ data={["F", "M"]} />
                }
            </Grid.Col>
            <Grid.Col span={4}>
                <TextInput label="Birth Date" defaultValue={patient.birthDate} name="birthDate" onChange={handleChange} readOnly={view} />
            </Grid.Col>
            <Grid.Col span={4}>
                <TextInput label="Email" defaultValue={patient.email} name="email" onChange={handleChange} readOnly={view} />
            </Grid.Col>
            <Grid.Col span={4}>
                <TextInput label="City" defaultValue={patient.city} name="city" onChange={handleChange} readOnly={view} />
            </Grid.Col>
            {
                view && passif &&
                <Grid.Col span={12}>
                    <Textarea label="Previous Medical Issues" readOnly maxRows={getNbLines(passif.medicalIssues)} defaultValue={passif.medicalIssues} />
                </Grid.Col>
            }
        </Grid >
    );
};

export default Biodatas;