import axios from "axios";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        console.log(e.target.value);
        setPatient(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleClick = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:3001/patients', patient);
            navigate('/patients');
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
                                <Form.Control type="text" placeholder="Name" onChange={handleChange} name="name" />
                            </FloatingLabel>
                        </Col>
                        <Col sm="5">
                            <FloatingLabel className='mb-3' controlId="floatingInput" label="Last Name">
                                <Form.Control type="text" placeholder="Last name" onChange={handleChange} name="lastName" />
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
                                <Form.Control type="text" placeholder="City" onChange={handleChange} name="city" />
                            </FloatingLabel>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-1" controlId="formBasicCom">
                        <Col sm="6">
                            <FloatingLabel className='mb-3' controlId="floatingInput" label="Email">
                                <Form.Control type="email" placeholder="Email" onChange={handleChange} name="email" />
                            </FloatingLabel>
                        </Col>
                        <Col sm="6">
                            <FloatingLabel className='mb-3' controlId="floatingInput" label="Phone">
                                <Form.Control type="phone" placeholder="Phone" /* onChange={handleChange} name="phone" */ />
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