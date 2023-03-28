import React from "react";
import { useState } from "react";
import axios from "axios";
// import Modal from "react-bootstrap/Modal";
// import Button from "react-bootstrap/Button";
// import Badge from "react-bootstrap/Badge";
// import dateToReadable from "../../tools/date";
// import Form from "react-bootstrap/Form";
// import FloatingLabel from "react-bootstrap/FloatingLabel";
// import Row from "react-bootstrap/Row";
// import Col from "react-bootstrap/Col";
import { Button, Modal, TextInput, Group } from "@mantine/core";
import { IPatient } from "../../interfaces";

interface IProps {
    show: boolean;
    toggleModal: () => void;
    patientInput: IPatient;
    handleDelete: (id: number | undefined) => void;
}

function ModalViewPatient({ show, toggleModal, patientInput, handleDelete }: IProps): JSX.Element {
    const handleClose = () => toggleModal();
    const passif = JSON.parse(patientInput.passif);

    const [update, setUpdate] = useState(false);
    const [patient, setPatient] = useState({
        birthDate: patientInput.birthDate,
        sex: patientInput.sex,
        email: patientInput.email,
        city: patientInput.city,
        medicalIssues: passif.medicalIssues,
    });

    const handleChange = (e: { target: { name: any; value: any; }; }) => {
        setPatient(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleUpdate = async () => {
        if (update) {
            if (patient.birthDate === "") {
                patient.birthDate = patientInput.birthDate;
            }
            if (patient.sex === "") {
                patient.sex = patientInput.sex;
            }
            if (patient.email === "") {
                patient.email = patientInput.email;
            }
            if (patient.city === "") {
                patient.city = patientInput.city;
            }
            if (patient.medicalIssues === "") {
                patient.medicalIssues = passif.medicalIssues;
            }
            const finalPatient = {
                name: patientInput.name,
                lastName: patientInput.lastName,
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
                await axios.put(`/api/patients/${patientInput.id}/update`, finalPatient);
            } catch (err) {
                console.log(err);
            }
        }
        setUpdate(!update);
    };

    return (
        <Modal opened={show} onClose={handleClose} title={patientInput.name + " " + patientInput.lastName}>
            {/* <Modal.Body> */}
            {/* <Form> */}
            {/* <Form.Group as={Row} className="mb-2" controlId="formBasicName"> */}
            {/* <Col sm="6"> */}
            {/* <FloatingLabel controlId="floatingID" label="ID" className="mb-3"> */}
            <TextInput label="ID" placeholder="ID" value={patientInput.id} readOnly />
            {/* </FloatingLabel> */}
            {/* </Col> */}
            {/* <Col sm="6"> */}
            {/* <FloatingLabel controlId="floatingSex" label="Sex" className="mb-3"> */}
            <TextInput label="Sex" placeholder="Sex" value={patientInput.sex} readOnly={!update} onChange={handleChange} name="sex" />
            {/* </FloatingLabel> */}
            {/* </Col> */}
            {/* </Form.Group> */}
            {/* <Form.Group as={Row} className="mb-2"> */}
            {/* <Col sm="6"> */}
            {/* <FloatingLabel controlId="floatingBirthDate" label="Birth Date" className="mb-3"> */}
            <TextInput label="Birth Date" placeholder="Birth Date" value={patientInput.birthDate} readOnly={!update} onChange={handleChange} name="birthDate" />
            {/* </FloatingLabel> */}
            {/* </Col> */}
            {/* <Col sm="6"> */}
            {/* <FloatingLabel controlId="floatingCity" label="City" className="mb-3"> */}
            <TextInput label="City" placeholder="City" value={patientInput.city} readOnly={!update} onChange={handleChange} name="city" />
            {/* </FloatingLabel> */}
            {/* </Col> */}
            {/* </Form.Group> */}
            {/* <FloatingLabel controlId="floatingEmail" label="Email" className="mb-3"> */}
            <TextInput label="Email" placeholder="Email" defaultValue={patientInput.email} readOnly={!update} onChange={handleChange} name="email" />
            {/* </FloatingLabel> */}
            {/* <Form.Group as={Row} className="mb-2"> */}
            {/* <Col sm="6"> */}
            {/* <Form.Label>Last Appointment:</Form.Label> */}
            {/* <Badge bg='success'>{passif.lastAppointments.length}</Badge> */}
            {/* </Col> */}
            {/* <Col sm="6"> */}
            {/* <FloatingLabel controlId="floatingNextApp" label="Next Appointment" className="mb-3"> */}
            {/* <Form.Control type="text" placeholder="Next Appointment" defaultValue={dateToReadable(patientInput.nextApp)} readOnly /> */}
            {/* </FloatingLabel> */}
            {/* </Col> */}
            {/* </Form.Group> */}
            {/* <FloatingLabel controlId="floatingPassif" label="Passif" className="mb-3"> */}
            {/* <Form.Control as="textarea" rows={4} placeholder="Passif" defaultValue={passif.medicalIssues} readOnly={!update} onChange={handleChange} name="medicalIssues" /> */}
            {/* </FloatingLabel> */}
            {/* </Form> */}
            {/* </Modal.Body> */}
            {/* <Modal.Footer> */}
            <Group position="right" p="md">
                <Button variant="light" color="red" onClick={() => handleDelete(patientInput.id)}>Delete</Button>
                <Button variant="light" onClick={handleUpdate}>{update ? "Save" : "Edit"}</Button>
                <Button color="gray" onClick={handleClose}>
                    Close
                </Button>
            </Group>
            {/* </Modal.Footer> */}
        </Modal>
    );
};

export default ModalViewPatient;