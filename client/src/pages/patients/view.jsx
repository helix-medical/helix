import React from "react";
import { useState } from "react";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import dateToReadable from "../../tools/date";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function ModalViewPatient(props) {
    const handleClose = () => props.toggleModal();
    const passif = JSON.parse(props.patient.passif);

    const [update, setUpdate] = useState(false);
    const [patient, setPatient] = useState({
        birthDate: props.patient.birthDate,
        sex: props.patient.sex,
        email: props.patient.email,
        city: props.patient.city,
        medicalIssues: passif.medicalIssues,
    });

    const handleChange = (e) => {
        setPatient(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleUpdate = async () => {
        if (update) {
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
                name: props.patient.name,
                lastName: props.patient.lastName,
                birthDate: patient.birthDate,
                sex: patient.sex,
                email: patient.email,
                city: patient.city,
                passif: JSON.stringify({
                    medicalIssues: patient.medicalIssues,
                    lastAppointments: passif.lastAppointments
                })
            };
            try {
                await axios.put(`/api/patients/${props.patient.id}/update`, finalPatient);
            } catch (err) {
                console.log(err);
            }
        }
        setUpdate(!update);
    }

    return (
        <Modal show={props.show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{props.patient.name} {props.patient.lastName}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group as={Row} className="mb-2" controlId="formBasicName">
                        <Col sm="6">
                            <FloatingLabel controlId="floatingID" label="ID" className="mb-3">
                                <Form.Control type="text" placeholder="ID" defaultValue={props.patient.id} readOnly />
                            </FloatingLabel>
                        </Col>
                        <Col sm="6">
                            <FloatingLabel controlId="floatingSex" label="Sex" className="mb-3">
                                <Form.Control type="text" placeholder="Sex" defaultValue={props.patient.sex} readOnly={!update} onChange={handleChange} name="sex" />
                            </FloatingLabel>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-2">
                        <Col sm="6">
                            <FloatingLabel controlId="floatingBirthDate" label="Birth Date" className="mb-3">
                                <Form.Control type="text" placeholder="Birth Date" defaultValue={props.patient.birthDate} readOnly={!update} onChange={handleChange} name="birthDate" />
                            </FloatingLabel>
                        </Col>
                        <Col sm="6">
                            <FloatingLabel controlId="floatingCity" label="City" className="mb-3">
                                <Form.Control type="text" placeholder="City" defaultValue={props.patient.city} readOnly={!update} onChange={handleChange} name="city" />
                            </FloatingLabel>
                        </Col>
                    </Form.Group>
                    <FloatingLabel controlId="floatingEmail" label="Email" className="mb-3">
                        <Form.Control type="email" placeholder="Email" defaultValue={props.patient.email} readOnly={!update} onChange={handleChange} name="email" />
                    </FloatingLabel>
                    <Form.Group as={Row} className="mb-2">
                        <Col sm="6">
                            <Form.Label>Last Appointment:</Form.Label>
                            <Badge bg='success'>{passif.lastAppointments.length}</Badge>
                        </Col>
                        <Col sm="6">
                            <FloatingLabel controlId="floatingNextApp" label="Next Appointment" className="mb-3">
                                <Form.Control type="text" placeholder="Next Appointment" defaultValue={dateToReadable(props.patient.nextApp)} readOnly />
                            </FloatingLabel>
                        </Col>
                    </Form.Group>
                    <FloatingLabel controlId="floatingPassif" label="Passif" className="mb-3">
                        <Form.Control as="textarea" rows={4} placeholder="Passif" defaultValue={passif.medicalIssues} readOnly={!update} onChange={handleChange} name="medicalIssues" />
                    </FloatingLabel>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={() => props.handleDelete(props.patient.id)}>Delete</Button>
                <Button variant="outline-primary" onClick={handleUpdate}>{update ? "Save" : "Edit"}</Button>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ModalViewPatient;