import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/esm/Row";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import FloatingLabel from "react-bootstrap/esm/FloatingLabel";

function PatientData(props) {
    return (
        <div className="patient-data">
            <h3>Patient Data</h3>
            <Tabs defaultActiveKey="data" id="uncontrolled-tab-example">
                <Tab eventKey="data" title="BioData">
                    <Form className="debug">
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
                                    <Form.Control readOnly defaultValue={props.patient.birthDate} />
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
                        <Form.Group as={Row} className="mb-1" controlId="formBasicApps">
                            <Col sm="6">
                                <FloatingLabel className="mb-3" label="Last Appointment">
                                    <Form.Control readOnly defaultValue={props.patient.lastApp} />
                                </FloatingLabel>
                            </Col>
                            <Col sm="6">
                                <FloatingLabel className="mb-3" label="Next Appointment">
                                    <Form.Control readOnly defaultValue={props.patient.nextApp} />
                                </FloatingLabel>
                            </Col>
                        </Form.Group>
                        <Button variant="outline-primary">
                            Edit Patient Data
                        </Button>
                    </Form>
                </Tab>
                <Tab eventKey="medical" title="Previous Medical Issues">
                    <Form className="debug">
                        <h3>Previous Medical Issues</h3>
                        <Form.Group controlId="formBasicMedicalIssues">
                            <Form.Control as="textarea" rows={10} defaultValue={props.patient.lastIssues} />
                        </Form.Group>
                    </Form>
                </Tab>
                <Tab eventKey="appointments" title="Previous Appointments">
                    <div className="debug">
                        <h3>Previous Appointments</h3>
                    </div>
                </Tab>
            </Tabs>
        </div>
    );
}

export default PatientData;