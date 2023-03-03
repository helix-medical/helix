import React from "react";
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import ModalViewPatient from "./viewPatient";
import { useState } from "react";

function PatientItem(props) {
    // const openModalView = async (e) => {
    //     e.preventDefault();
    //     return <ModalViewPatient patient={props.patient} show={true}/>
    // }

    const [show, setShow] = useState(false);
    const toggleModal = () => setShow(!show);

    return (
        <div className="patient" key={props.patient.id}>
            <Card border='primary' style={{ width: '18rem' }}>
                <Card.Body>
                    <Card.Title>{props.patient.name} {props.patient.lastName}</Card.Title>
                    <ListGroup variant="flush">
                        <ListGroup.Item>Sex: {props.patient.sex}</ListGroup.Item>
                        <ListGroup.Item>Birth Date: {props.patient.birthDate}</ListGroup.Item>
                        <ListGroup.Item>ID: {props.patient.id}</ListGroup.Item>
                    </ListGroup>
                    <Button variant="outline-primary" onClick={toggleModal}>More Infos</Button>
                </Card.Body>
                <Card.Footer>
                    <small className="text-muted">Next Appointment: 2023-02-28</small>
                </Card.Footer>
            </Card>
            {show && <ModalViewPatient patient={props.patient} show={show} toggleModal={toggleModal} handleDelete={props.handleDelete} />}
        </div>
    );
}

export default PatientItem;