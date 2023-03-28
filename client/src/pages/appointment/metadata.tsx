import React from "react";
import { TextInput, Title, /* Grid, */ Group } from "@mantine/core";
import dateToReadable from "../../tools/date";
import { IAppointmentData } from "../../interfaces";

interface IProps {
    appointment: IAppointmentData;
}

function Metadata({ appointment }: IProps): JSX.Element {
    return (
        <>
            <Title order={2}>Appointment Data</Title>
            <Group>
                {/* <Form.Group as={Row} className="mb-1" controlId="formBasicDate">
                    <Col sm="4">
                        <FloatingLabel className="mb-3" label="Date"> */}
                <TextInput label="Date" readOnly defaultValue={dateToReadable(appointment.date)} />
                {/* </FloatingLabel>
                    </Col>
                    <Col sm="4">
                        <FloatingLabel className="mb-3" label="Kind"> */}
                <TextInput label="Kind" readOnly defaultValue={appointment.reasons} />
                {/* </FloatingLabel>
                    </Col>
                    <Col sm="4"> */}
                {/* <FloatingLabel className="mb-3" label="Patient ID"> */}
                <TextInput label="Patient ID" readOnly defaultValue={appointment.patientId} />
                {/* </FloatingLabel>
                    </Col>
                </Form.Group> */}
            </Group>
        </>
    );
};

export default Metadata;