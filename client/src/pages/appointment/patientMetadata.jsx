import React from "react";
import { useState } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Badge from "react-bootstrap/Badge";
import dateToReadable from "../../tools/date";

function PatientMetadata(props) {
    const passif = JSON.parse(props.patient.passif);
    const id = props.patient.patientId;

    const [patient, setPatient] = useState({
        name: props.patient.name,
        lastName: props.patient.lastName,
        birthDate: props.patient.birthDate,
        sex: props.patient.sex,
        email: props.patient.email,
        city: props.patient.city,
        medicalIssues: passif.medicalIssues,
    });

    const handleChange = (e) => {
        setPatient(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleClick = async (e) => {
        if (patient.name === "") {
            patient.name = props.patient.name;
        }
        if (patient.lastName === "") {
            patient.lastName = props.patient.lastName;
        }
        if (patient.birthDate === "") {
            patient.birthDate = props.patient.birthDate;
        }
        if (patient.sex === "") {
            patient.sex = props.patient.sex;
        }
        if (patient.email === "") {
            patient.email = props.patient.email;
        }
        if (patient.city === "") {
            patient.city = props.patient.city;
        }
        if (patient.medicalIssues === "") {
            patient.medicalIssues = passif.medicalIssues;
        }
        const finalPatient = {
            name: patient.name,
            lastName: patient.lastName,
            birthDate: dateToReadable(patient.birthDate),
            sex: patient.sex,
            email: patient.email,
            city: patient.city,
            passif: JSON.stringify({
                medicalIssues: patient.medicalIssues,
                lastAppointments: passif.lastAppointments
            })
        };
        console.log(finalPatient);
        e.preventDefault();
        try {
            const res = await axios.put(`/api/patients/${id}/update`, finalPatient);
            console.log(res);
        } catch (error) {
            console.log(error);
        }
    };


    return (
        <div className="debug">
            <h2>Patient Data</h2>
            <Tabs defaultActiveKey="data" id="uncontrolled-tab-example" className="mb-3">
                <Tab eventKey="data" title="BioData">
                    <Form className="step">
                        <Form.Group as={Row} className="mb-1" controlId="formBasicName">
                            <Col sm="4">
                                <FloatingLabel className="mb-3" label="Name">
                                    <Form.Control defaultValue={props.patient.name} name="name" onChange={handleChange} />
                                </FloatingLabel>
                            </Col>
                            <Col sm="4">
                                <FloatingLabel className="mb-3" label="Last Name">
                                    <Form.Control defaultValue={props.patient.lastName} name="lastName" onChange={handleChange} />
                                </FloatingLabel>
                            </Col>
                            <Col sm="4">
                                <FloatingLabel className="mb-3" label='Sex'>
                                    <Form.Select name="sex" onChange={handleChange} >
                                        <option>{props.patient.sex}</option>
                                        <option value="F">F</option>
                                        <option value="M">M</option>
                                    </Form.Select>
                                </FloatingLabel>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-1" controlId="formBasicBirthDate">
                            <Col sm="4">
                                <FloatingLabel className="mb-3" label="Birth Date">
                                    <Form.Control defaultValue={props.patient.birthDate} name="birthDate" onChange={handleChange} />
                                </FloatingLabel>
                            </Col>
                            <Col sm="4">
                                <FloatingLabel className="mb-3" label="Email">
                                    <Form.Control defaultValue={props.patient.email} name="email" onChange={handleChange} />
                                </FloatingLabel>
                            </Col>
                            <Col sm="4">
                                <FloatingLabel className="mb-3" label="City">
                                    <Form.Control defaultValue={props.patient.city} name="city" onChange={handleChange} />
                                </FloatingLabel>
                            </Col>
                        </Form.Group>
                    </Form>
                </Tab>
                <Tab eventKey="medical" title="Previous Medical Issues">
                    <Form className="step">
                        <h3>Previous Medical Issues</h3>
                        <Form.Group controlId="formBasicMedicalIssues">
                            <Form.Control as="textarea" rows={10} defaultValue={passif.medicalIssues} name="medicalIssues" onChange={handleChange} />
                        </Form.Group>
                    </Form>
                </Tab>
                <Tab eventKey="appointments" title="Previous Appointments">
                    <div className="step">
                        <h3>Previous Appointments <Badge pill bg='secondary'>{passif.lastAppointments.length - 1}</Badge><Badge bg='danger'>NOT IMPLEMENTED</Badge></h3>
                    </div>
                </Tab>
            </Tabs>
            <Button variant="outline-primary" onClick={handleClick} className="button-center">
                Update Patient Data
            </Button>
        </div>
    );
}

export default PatientMetadata;