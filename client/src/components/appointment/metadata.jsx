import React from "react";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import dateToReadable from "../../utils/date";

function Metadata(props) {
    return (
        <div className="debug">
            <h2>Appointment Data</h2>
            <Form>
                <Form.Group as={Row} className="mb-1" controlId="formBasicDate">
                    <Col sm="4">
                        <FloatingLabel className="mb-3" label="Date">
                            <Form.Control readOnly defaultValue={dateToReadable(props.appointment.date)} />
                        </FloatingLabel>
                    </Col>
                    <Col sm="4">
                        <FloatingLabel className="mb-3" label="Kind">
                            <Form.Control readOnly defaultValue={props.appointment.reasons} />
                        </FloatingLabel>
                    </Col>
                    <Col sm="4">
                        <FloatingLabel className="mb-3" label="Patient ID">
                            <Form.Control readOnly defaultValue={props.appointment.patientId} />
                        </FloatingLabel>
                    </Col>
                </Form.Group>
            </Form>
        </div>
    )
}

export default Metadata;