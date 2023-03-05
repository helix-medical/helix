import React from "react";
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import ModalViewPatient from "./modalViewPatient";
import { useState } from "react";

function PatientItemGrid(props) {
    const [show, setShow] = useState(false);
    const toggleModal = () => setShow(!show);

    return (
        <div className="card-view" key={props.patient.id}>
            <Card border='primary' style={{ width: '18rem' }}>
                <Card.Body>
                    <Card.Title>{props.patient.name} {props.patient.lastName}</Card.Title>
                    <ListGroup variant="flush">
                        <ListGroup.Item>ID: {props.patient.id}</ListGroup.Item>
                        <ListGroup.Item>Sex: {props.patient.sex}</ListGroup.Item>
                    </ListGroup>
                    <Button variant="outline-primary" onClick={toggleModal}>More Info</Button>
                </Card.Body>
                <Card.Footer>
                    <small className="text-muted">Next Appointment: {props.patient.nextApp}</small>
                </Card.Footer>
            </Card>
            {show && <ModalViewPatient patient={props.patient} show={show} toggleModal={toggleModal} handleDelete={props.handleDelete} />}
        </div>
    );
}

export default PatientItemGrid;