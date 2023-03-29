import React from "react";
import { Textarea, Title, Grid, TextInput } from "@mantine/core";
import getNbLines from "../../tools/getLines";
import { IAppointmentData } from "../../interfaces";

interface IProps {
    appointment: IAppointmentData,
    handler?: (arg0: any) => void,
    view?: boolean
}

function Conclusion({ appointment, handler, view }: IProps): JSX.Element {
    const handleChange = (e: { target: { name: any; value: any; }; }) => {
        if (handler)
            handler((prev: any) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const conclusion = JSON.parse(appointment.conclusion);

    const nbLines = (text: string, base: number) => {
        return view ? getNbLines(text) : base;
    };

    return (
        <>
            <Title order={2}>Conclusion</Title>
            <Grid columns={12}>
                <Grid.Col span={12}>
                    <TextInput label="Diagnosis" name='diagnosis' onChange={handleChange} defaultValue={conclusion.diagnosis} readOnly={view} />
                </Grid.Col>
                <Grid.Col span={12}>
                    <Textarea label="Treatment" maxRows={nbLines(conclusion.treatment, 3)} name='treatment' onChange={handleChange} defaultValue={conclusion.treatment} readOnly={view} />
                </Grid.Col>
                <Grid.Col span={6}>
                    <Textarea label="Observations" maxRows={nbLines(conclusion.observations, 3)} name='observations' onChange={handleChange} defaultValue={conclusion.observations} readOnly={view} />
                </Grid.Col>
                {/* <Col sm="2"> */}
                {/* <Form.Group className="mb-3" controlId="formBasicNeedApp"> */}
                {/* <Form.Label>Need appointment</Form.Label> */}
                {/* <Form.Check type="checkbox" readOnly={view} disabled /> */}
                {/* <Col sm="3"> */}
                {/* <Form.Label>Next appointment</Form.Label> */}
                {/* <Textarea rows={1} placeholder='NOT WORKING' readOnly={view} disabled /> */}
            </Grid>
        </>
    );
};

export default Conclusion;