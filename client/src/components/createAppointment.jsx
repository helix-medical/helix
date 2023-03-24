import React from "react";
import { useState } from "react";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";

function ModalCreateApp(props) {
    const handleClose = () => props.toggleModal();

    const [data, setData] = useState({
        patientId: 0,
        date: "",
        time: "",
        reasons: "",
        anamnesis: {
            reasons: "",
            symptoms: "",
            knownDiseases: "",
            knownMedications: ""
        },
        conclusion: {
            diagnosis: "",
            treatment: "",
            observations: ""
        }
    });

    const handleChange = (e) => {
        setData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleClick = async (e) => {
        let index;
        const finalData = {
            patientId: data.patientId,
            date: data.date + " " + data.time,
            reasons: data.reasons,
            anamnesis: JSON.stringify(data.anamnesis),
            conclusion: JSON.stringify(data.conclusion)
        }
        console.log(finalData);
        e.preventDefault();
        try {
            index = await axios.post(`/api/appointments/new`, finalData);
            await axios.put(`/api/patients/${data.patientId}/add_appointment`, { "id": index.data });
        } catch (error) {
            console.log(error);
        }
        props.toggleModal();
        console.log(index.data);
        window.location.href = `/appointments/${index.data}/edit`;
    }

    return (
        <Modal show={props.show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Create Appointment</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <FloatingLabel className='mb-3' controlId="floatingDate" label="Date">
                        <Form.Control type="date" placeholder="Date" onChange={handleChange} name='date' />
                    </FloatingLabel>
                    <FloatingLabel className='mb-3' controlId="floatingTime" label="Time">
                        <Form.Control type="time" placeholder="Time" onChange={handleChange} name='time' />
                    </FloatingLabel>
                    <FloatingLabel className='mb-3' controlId="floatingPatientId" label="Patient ID">
                        <Form.Control type="number" placeholder="Patient ID" onChange={handleChange} name='patientId' />
                    </FloatingLabel>
                    <FloatingLabel className='mb-3' controlId="floatingKind" label="Kind">
                        <Form.Select onChange={handleChange} name="reasons">
                            <option>Choose Option</option>
                            <option value="first-visit">First Visit</option>
                            <option value="follow-up">Follow Up</option>
                            <option value="pediatrics">Pediatrics</option>
                            <option value="maternity">Maternity</option>
                            <option value="emergency">Emergency</option>
                        </Form.Select>
                    </FloatingLabel>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={handleClose}>Cancel</Button>
                <Button variant='success' onClick={handleClick}>Submit</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ModalCreateApp;