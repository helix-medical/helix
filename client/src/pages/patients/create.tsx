import axios from "axios";
import React from "react";
import { useState } from "react";
import { Button, Modal, TextInput, Select, Group } from "@mantine/core";
import { DateInput } from '@mantine/dates';

interface IProps {
    show: boolean;
    toggleModal: () => void;
}

function ModalAddPatient({ show, toggleModal }: IProps): JSX.Element {
    const handleClose = () => toggleModal();
    const [patient, setPatient] = useState({
        name: "",
        lastName: "",
        birthDate: "",
        sex: "",
        email: "",
        city: "",
        nextApp: "",
        passif: JSON.stringify({
            medicalIssues: "",
            lastAppointments: [0],
        })
    });

    const handleChange = (e: { target: { name: any; value: any; }; }) => {
        setPatient(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleClick = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        try {
            await axios.post(`/api/patients/add`, patient);
        } catch (error) {
            console.log(error);
        }
        toggleModal();
        window.location.reload();
    };

    return (
        <Modal opened={show} onClose={handleClose} size='lg' title="New Patient">
            {/* <Modal.Body> */}
            {/* <Form> */}
            {/* <Form.Group as={Row} className="mb-2" controlId="formBasicName"> */}
            {/* <Col sm="5"> */}
            {/* <FloatingLabel className='mb-3' controlId="floatingInput" label="Name"> */}
            <TextInput placeholder='Name' label="Name" onChange={handleChange} name="name" withAsterisk />
            {/* </FloatingLabel> */}
            {/* </Col> */}
            {/* <Col sm="5"> */}
            {/* <FloatingLabel className='mb-3' controlId="floatingInput" label="Last Name"> */}
            <TextInput placeholder='Last Name' label="Last Name" onChange={handleChange} name="lastName" withAsterisk />
            {/* </FloatingLabel> */}
            {/* </Col> */}
            {/* <Col sm="2"> */}
            {/* <FloatingLabel className='mb-3' controlId="floatingSelect" label="Sex"> */}
            <Select label='Sex' placeholder="Choose" data={['F', 'M']}/*onChange={handleChange}*/ name="sex" withAsterisk />
            {/* </FloatingLabel> */}
            {/* </Col> */}
            {/* </Form.Group> */}
            {/* <Form.Group as={Row} className="mb-2" controlId="formBasicBirth"> */}
            {/* <Col sm="6"> */}
            {/* <FloatingLabel className='mb-3' controlId="floatingInput" label="Birth Date"> */}
            <DateInput label="Date of Birth" placeholder="Choose" /*onChange={handleChange}*/ name="birthDate" withAsterisk />
            {/* </FloatingLabel> */}
            {/* </Col> */}
            {/* <Col sm="6"> */}
            {/* <FloatingLabel className='mb-3' controlId="floatingInput" label="City"> */}
            <TextInput label="City" placeholder='City' onChange={handleChange} name="city" withAsterisk />
            {/* </FloatingLabel> */}
            {/* </Col> */}
            {/* </Form.Group> */}
            {/* // <Form.Group as={Row} className="mb-1" controlId="formBasicCom"> */}
            {/* <Col sm="6"> */}
            {/* <FloatingLabel className='mb-3' controlId="floatingInput" label="Email Address"> */}
            <TextInput placeholder='Email Address' label='Email Address' onChange={handleChange} name="email" withAsterisk />
            {/* </FloatingLabel> */}
            {/* </Col> */}
            {/* <Col sm="6"> */}
            {/* <FloatingLabel className='mb-3' controlId="floatingInput" label="Phone"> */}
            {/* <Form.Control type="tel" placeholder='Phone Number' defaultValue="+33 (0)" /* onChange={handleChange} name="phone" /> */}
            {/* </FloatingLabel> */}
            {/* </Col> */}
            {/* </Form.Group> */}
            {/* <Form.Group as={Row} className="mb-1" controlId="formBasicApp"> */}
            {/* <Col sm="6"> */}
            {/* <FloatingLabel className='mb-3' controlId="floatingInput" label="Last Appointment"> */}
            {/* <Form.Control type="date" onChange={handleChange} name="lastApp" /> */}
            {/* </FloatingLabel> */}
            {/* </Col> */}
            {/* <Col sm="6"> */}
            {/* <FloatingLabel className='mb-3' controlId="floatingInput" label="Next Appointment"> */}
            {/* <Form.Control type="date" onChange={handleChange} name="nextApp" /> */}
            {/* </FloatingLabel> */}
            {/* </Col> */}
            {/* </Form.Group> */}
            {/* // </Form> */}
            {/* // </Modal.Body > */}
            {/* // <Modal.Footer> */}
            <Group position="right">
                <Button variant="light" color="red" onClick={handleClose}>Cancel</Button>
                <Button color="green" onClick={handleClick}>Add</Button>
            </Group>
            {/* </Modal.Footer> */}
        </Modal >
    );
};

export default ModalAddPatient;