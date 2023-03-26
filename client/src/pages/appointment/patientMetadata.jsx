import React from "react";
import { useState } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
// import Col from "react-bootstrap/Col";
// import Row from "react-bootstrap/Row";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
// import FloatingLabel from "react-bootstrap/FloatingLabel";
import PreviousAppointments from "./previousAppointments";
import Biodatas from "./biodatas";

function PatientMetadata({ patientInput }) {
    const passif = JSON.parse(patientInput.passif);
    const id = patientInput.patientId;

    const [patient, setPatient] = useState({
        name: patientInput.name,
        lastName: patientInput.lastName,
        birthDate: patientInput.birthDate,
        sex: patientInput.sex,
        email: patientInput.email,
        city: patientInput.city,
        medicalIssues: passif.medicalIssues,
    });

    const handleChange = (e) => {
        setPatient(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleClick = async (e) => {
        if (patient.name === "") {
            patient.name = patientInput.name;
        }
        if (patient.lastName === "") {
            patient.lastName = patientInput.lastName;
        }
        if (patient.birthDate === "") {
            patient.birthDate = patientInput.birthDate;
        }
        if (patient.sex === "") {
            patient.sex = patientInput.sex;
        }
        if (patient.email === "") {
            patient.email = patientInput.email;
        }
        if (patient.city === "" || patient.city === undefined) {
            patient.city = patientInput.city;
        }
        if (patient.medicalIssues === "") {
            patient.medicalIssues = passif.medicalIssues;
        }
        const finalPatient = {
            name: patient.name,
            lastName: patient.lastName,
            birthDate: patient.birthDate,
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
                    <Biodatas patient={patientInput} handler={setPatient} view={false} />
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
                    <PreviousAppointments passif={passif} />
                </Tab>
            </Tabs>
            <Button variant="outline-primary" onClick={handleClick} className="button-center">
                Update Patient Data
            </Button>
        </div>
    );
};

export default PatientMetadata;