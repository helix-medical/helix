import React from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import dateToReadable from "../../../tools/date";

function PatientMetadata(props) {
    return (
        <div className="debug">
            <h2>Patient Data</h2>
            <Form /*className="step"*/>
                <Form.Group as={Row} className="mb-1" controlId="formBasicName">
                    <Col sm="4">
                        <FloatingLabel className="mb-3" label="Name">
                            <Form.Control readOnly defaultValue={props.patient.name} />
                        </FloatingLabel>
                    </Col>
                    <Col sm="4">
                        <FloatingLabel className="mb-3" label="Last Name">
                            <Form.Control readOnly defaultValue={props.patient.lastName} />
                        </FloatingLabel>
                    </Col>
                    <Col sm="4">
                        <FloatingLabel className="mb-3" label='Sex'>
                            <Form.Control readOnly defaultValue={props.patient.sex} />
                        </FloatingLabel>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-1" controlId="formBasicBirthDate">
                    <Col sm="4">
                        <FloatingLabel className="mb-3" label="Birth Date">
                            <Form.Control readOnly defaultValue={dateToReadable(props.patient.birthDate)} />
                        </FloatingLabel>
                    </Col>
                    <Col sm="4">
                        <FloatingLabel className="mb-3" label="Email">
                            <Form.Control readOnly defaultValue={props.patient.email} />
                        </FloatingLabel>
                    </Col>
                    <Col sm="4">
                        <FloatingLabel className="mb-3" label="City">
                            <Form.Control readOnly defaultValue={props.patient.city} />
                        </FloatingLabel>
                    </Col>
                </Form.Group>
            </Form>
        </div>
    );
}

export default PatientMetadata;