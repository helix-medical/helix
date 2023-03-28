import React from "react";
import { Textarea, Title, /* Grid, */ Group } from "@mantine/core";
import getNbLines from "../../tools/getLines";
import { IAppointmentData } from "../../interfaces";

interface IProps {
    appointment: IAppointmentData;
    handler?: (arg0: any) => void;
    view?: boolean;
}

function Anamnesis({ appointment, handler, view }: IProps): JSX.Element {
    const handleChange = (e: { target: { name: any; value: any; }; }) => {
        if (handler)
            handler((prev: any) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const anamnesis = JSON.parse(appointment.anamnesis);

    const nbLines = (text: string, base: number) => view ? getNbLines(text) : base;

    return (
        <div className="debug">
            <Title order={2}>Anamnesis</Title>
            <Group className="step">
                {/* <Form.Group className="mb-3" controlId="formBasicReasons"> */}
                <Textarea label="Reasons for the consultation" maxRows={nbLines(anamnesis.reasons, 1)} name='reasons' onChange={handleChange} defaultValue={anamnesis.reasons} readOnly={view} />
                {/* <Form.Group className="mb-3" controlId="formBasicSymptoms"> */}
                <Textarea label="Symptoms" maxRows={nbLines(anamnesis.symptoms, 3)} name='symptoms' onChange={handleChange} defaultValue={anamnesis.symptoms} readOnly={view} />
                {/* <Row> */}
                {/* <Col> */}
                {/* <Form.Group className="mb-3" controlId="formBasicDiseases"> */}
                <Textarea label="Known diseases" maxRows={nbLines(anamnesis.knownDiseases, 3)} name='knownDiseases' onChange={handleChange} defaultValue={anamnesis.knownDiseases} readOnly={view} />
                {/* </Col> */}
                {/* <Col> */}
                {/* <Form.Group className="mb-3" controlId="formBasicMedications"> */}
                <Textarea label="Medications" maxRows={nbLines(anamnesis.knownMedications, 3)} name='knownMedications' onChange={handleChange} defaultValue={anamnesis.knownMedications} readOnly={view} />
                {/* </Col> */}
                {/* </Row> */}
            </Group>
        </div>
    );
};

export default Anamnesis;