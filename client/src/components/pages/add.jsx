import axios from "axios";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import FloatingLabel from "react-bootstrap/FloatingLabel";

const Add = () => {
    const [patient, setPatient] = useState({
        name: "",
        lastName: "",
        birthDate: "",
        sex: ""
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
    };

    return (
        <div>
            <h1>Add a Patient</h1>
            <Form>
                <Form.Group as={Row} className="mb-3" controlId="formBasicName">
                    <Form.Label column sm="2">Name</Form.Label>
                    <Col sm="10">
                        <Form.Control type="text" placeholder="Name" onChange={handleChange} name="name" />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3" controlId="formBasicLastName">
                    <Form.Label column sm="2">Last Name</Form.Label>
                    <Col sm="10">
                        <Form.Control type="text" placeholder="Last name" onChange={handleChange} name="lastName" />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3" controlId="formBasicSex">
                    <Form.Label column sm="2">Sex</Form.Label>
                    <Col sm="10">
                    <FloatingLabel controlId="floatingSelect" label="Choose Sex">
                        <Form.Select aria-label="Default select example" onChange={handleChange} name="sex">
                            <option value="F">F</option>
                            <option value="M">M</option>
                            <option value="A">A</option>
                        </Form.Select>
                    </FloatingLabel>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3" controlId="formBasicBirthDate">
                    <Form.Label column sm="2">Birth Date</Form.Label>
                    <Col sm="10">
                        <Form.Control type="text" placeholder="Birth Date (YYYY-MM-DD)" onChange={handleChange} name="birthDate" />
                    </Col>
                </Form.Group>
            </Form>
            <Button variant="primary" onClick={handleClick} size='lg'>Add</Button>
        </div>
    )
};

export default Add;