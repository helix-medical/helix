import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/esm/Row";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import FloatingLabel from "react-bootstrap/esm/FloatingLabel";
import Badge from "react-bootstrap/Badge";

function PatientData(props) {
    return (
        <div className="debug">
            <h2>Patient Data</h2>
            <Tabs defaultActiveKey="data" id="uncontrolled-tab-example" className="mb-3">
                <Tab eventKey="data" title="BioData">
                    <Form className="step">
                        <Form.Group as={Row} className="mb-1" controlId="formBasicName">
                            <Col sm="4">
                                <FloatingLabel className="mb-3" label="Name">
                                    <Form.Control defaultValue={props.patient.name} />
                                </FloatingLabel>
                            </Col>
                            <Col sm="4">
                                <FloatingLabel className="mb-3" label="Last Name">
                                    <Form.Control defaultValue={props.patient.lastName} />
                                </FloatingLabel>
                            </Col>
                            <Col sm="4">
                                <FloatingLabel className="mb-3" label='Sex'>
                                    <Form.Select defaultValue={props.patient.sex}>
                                        <option value="F">F</option>
                                        <option value="M">M</option>
                                        <option value="A">A</option>
                                    </Form.Select>
                                </FloatingLabel>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-1" controlId="formBasicBirthDate">
                            <Col sm="4">
                                <FloatingLabel className="mb-3" label="Birth Date">
                                    <Form.Control defaultValue={props.patient.birthDate} />
                                </FloatingLabel>
                            </Col>
                            <Col sm="4">
                                <FloatingLabel className="mb-3" label="Email">
                                    <Form.Control defaultValue={props.patient.email} />
                                </FloatingLabel>
                            </Col>
                            <Col sm="4">
                                <FloatingLabel className="mb-3" label="City">
                                    <Form.Control defaultValue={props.patient.city} />
                                </FloatingLabel>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-1" controlId="formBasicApps">
                            <Col sm="6">
                                <FloatingLabel className="mb-3" label="Last Appointment">
                                    <Form.Control defaultValue={props.patient.lastApp} />
                                </FloatingLabel>
                            </Col>
                            <Col sm="6">
                                <FloatingLabel className="mb-3" label="Next Appointment">
                                    <Form.Control defaultValue={props.patient.nextApp} />
                                </FloatingLabel>
                            </Col>
                        </Form.Group>
                        <Button variant="outline-primary">
                            Edit Patient Data
                        </Button>
                    </Form>
                </Tab>
                <Tab eventKey="medical" title="Previous Medical Issues">
                    <Form className="step">
                        <h3>Previous Medical Issues</h3>
                        <Form.Group controlId="formBasicMedicalIssues">
                            <Form.Control as="textarea" rows={10} defaultValue={props.patient.lastIssues} />
                        </Form.Group>
                    </Form>
                </Tab>
                <Tab eventKey="appointments" title="Previous Appointments">
                    <div className="step">
                        <h3>Previous Appointments <Badge pill bg='secondary'>0</Badge></h3>
                    </div>
                </Tab>
            </Tabs>
        </div>
    );
}

export default PatientData;