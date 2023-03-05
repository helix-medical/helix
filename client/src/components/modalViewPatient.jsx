import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import Badge from "react-bootstrap/Badge";


function ModalViewPatient(props) {
    const handleClose = () => props.toggleModal();

    return (
        <Modal show={props.show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{props.patient.name} {props.patient.lastName}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <ListGroup variant="flush">
                    <ListGroup.Item>ID: {props.patient.id}</ListGroup.Item>
                    <ListGroup.Item>Sex: {props.patient.sex}</ListGroup.Item>
                    <ListGroup.Item>Birth Date: {props.patient.birthDate}</ListGroup.Item>
                    <ListGroup.Item>Email: {props.patient.email}</ListGroup.Item>
                    <ListGroup.Item>City: {props.patient.city}</ListGroup.Item>
                    <ListGroup.Item>Last Appointment: {props.patient.lastApp}
                        <Badge pill bg='primary'>12</Badge>
                    </ListGroup.Item>
                    <ListGroup.Item>Next Appointment: {props.patient.nextApp}</ListGroup.Item>
                </ListGroup>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={() => props.handleDelete(props.patient.id)}>Delete</Button>
                <Button variant="outline-primary" href={`/update/${props.patient.id}`}>Edit</Button>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ModalViewPatient;