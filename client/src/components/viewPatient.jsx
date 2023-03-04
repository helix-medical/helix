import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";


function ModalViewPatient(props) {
    const handleClose = () => props.toggleModal();

    return (
        <>
            <Modal show={props.show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Patient {props.patient.name} {props.patient.lastName}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ListGroup variant="flush">
                        <ListGroup.Item>Sex: {props.patient.sex}</ListGroup.Item>
                        <ListGroup.Item>Birth Date: {props.patient.birthDate}</ListGroup.Item>
                        <ListGroup.Item>ID: {props.patient.id}</ListGroup.Item>
                        <ListGroup.Item>Email: {props.patient.email}</ListGroup.Item>
                        <ListGroup.Item>City: {props.patient.city}</ListGroup.Item>
                        <ListGroup.Item>Last Appointment: {props.patient.lastApp}</ListGroup.Item>
                        <ListGroup.Item>Next Appointment: {props.patient.nextApp}</ListGroup.Item>
                    </ListGroup>
                    <Button variant="primary" href={`/update/${props.patient.id}`}>Edit</Button>
                    <Button variant="danger" onClick={() => props.handleDelete(props.patient.id)}>Delete</Button>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-danger" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalViewPatient;