import React from "react";
import { TextInput, Textarea, /* Grid, */ Group, Select } from "@mantine/core";
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
        <Group className="step">
            {/* <Form.Group as={Row} className="mb-1" controlId="formBasicName"> */}
            {/* <Col sm="4"> */}
            <TextInput label="Name" defaultValue={patient.name} name="name" onChange={handleChange} readOnly={view} />
            {/* </Col> */}
            {/* <Col sm="4"> */}
            <TextInput label='Last Name' defaultValue={patient.lastName} name="lastName" onChange={handleChange} readOnly={view} />
            {/* </Col> */}
            {/* <Col sm="4"> */}
            {
                view
                    ? <TextInput label="Sex" readOnly defaultValue={patient.sex} />
                    : <Select label="Sex" placeholder={patient.sex} name="sex" /*onChange={handleChange}*/ data={[patient.sex, "F", "M"]} />
            }
            {/* </Col> */}
            {/* <Form.Group as={Row} className="mb-1" controlId="formBasicBirthDate"> */}
            {/* <Col sm="4"> */}
            <TextInput label="Birth Date" defaultValue={patient.birthDate} name="birthDate" onChange={handleChange} readOnly={view} />
            {/* </Col> */}
            {/* <Col sm="4"> */}
            <TextInput label="Email" defaultValue={patient.email} name="email" onChange={handleChange} readOnly={view} />
            {/* </Col> */}
            {/* <Col sm="4"> */}
            <TextInput label="City" defaultValue={patient.city} name="city" onChange={handleChange} readOnly={view} />
            {/* </Col> */}
            {
                view && passif &&
                <Textarea label="Previous Medical Issues" readOnly maxRows={getNbLines(passif.medicalIssues)} defaultValue={passif.medicalIssues} />
            }
            {/* </Col> */}
        </Group >
    );
};

export default Biodatas;