import axios from "axios";
import React from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Modal from "react-bootstrap/Modal";

function ModalAddPatient(props) {
    const handleClose = () => props.toggleModal();
    const [patient, setPatient] = useState({
        name: "",
        lastName: "",
        birthDate: "",
        sex: "",
        email: "",
        city: "",
        lastApp: "",
        nextApp: "",
        passif: JSON.stringify({}),
    });

    const handleChange = (e) => {
        setPatient(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleClick = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://172.16.183.69:3001/patients', patient);
        } catch (error) {
            console.log(error);
        }
        props.toggleModal();
        window.location.reload();
    };

    return (
        <Modal show={props.show} onHide={handleClose} size='lg'>
            <Modal.Header closeButton>
                <Modal.Title>Add a Patient</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group as={Row} className="mb-2" controlId="formBasicName">
                        <Col sm="5">
                            <FloatingLabel className='mb-3' controlId="floatingInput" label="Name">
                                <Form.Control type="text" onChange={handleChange} name="name" />
                            </FloatingLabel>
                        </Col>
                        <Col sm="5">
                            <FloatingLabel className='mb-3' controlId="floatingInput" label="Last Name">
                                <Form.Control type="text" onChange={handleChange} name="lastName" />
                            </FloatingLabel>
                        </Col>
                        <Col sm="2">
                            <FloatingLabel className='mb-3' controlId="floatingSelect" label="Sex">
                                <Form.Select onChange={handleChange} name="sex">
                                    <option value="F">F</option>
                                    <option value="M">M</option>
                                    <option value="A">A</option>
                                </Form.Select>
                            </FloatingLabel>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-2" controlId="formBasicBirth">
                        <Col sm="6">
                            <FloatingLabel className='mb-3' controlId="floatingInput" label="Birth Date">
                                <Form.Control type="date" onChange={handleChange} name="birthDate" />
                            </FloatingLabel>
                        </Col>
                        <Col sm="6">
                            <FloatingLabel className='mb-3' controlId="floatingInput" label="City">
                                <Form.Control type="text" onChange={handleChange} name="city" />
                            </FloatingLabel>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-1" controlId="formBasicCom">
                        <Col sm="6">
                            <FloatingLabel className='mb-3' controlId="floatingInput" label="Email">
                                <Form.Control type="email" onChange={handleChange} name="email" />
                            </FloatingLabel>
                        </Col>
                        <Col sm="6">
                            <FloatingLabel className='mb-3' controlId="floatingInput" label="Phone">
                                <Form.Control type="phone" /* onChange={handleChange} name="phone" */ />
                            </FloatingLabel>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-1" controlId="formBasicApp">
                        <Col sm="6">
                            <FloatingLabel className='mb-3' controlId="floatingInput" label="Last Appointment">
                                <Form.Control type="date" onChange={handleChange} name="lastApp" />
                            </FloatingLabel>
                        </Col>
                        <Col sm="6">
                            <FloatingLabel className='mb-3' controlId="floatingInput" label="Next Appointment">
                                <Form.Control type="date" onChange={handleChange} name="nextApp" />
                            </FloatingLabel>
                        </Col>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={handleClose}>Cancel</Button>
                <Button variant="success" onClick={handleClick}>Add</Button>
            </Modal.Footer>
        </Modal>
    )
};

export default ModalAddPatient;