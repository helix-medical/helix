import React from "react";
import { useState } from "react";
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import dateToReadable from "../../tools/date";
import ModalViewPatient from "./view";
import { IPatient } from "../../interfaces";

interface IProps {
    patient: IPatient;
    handleDelete: (id: number | undefined) => void;
}

function PatientItemGrid({ patient, handleDelete }: IProps): JSX.Element {
    const [show, setShow] = useState(false);
    const toggleModal = () => setShow(!show);

    return (
        <div className="card-view" key={patient.id}>
            <Card border='primary' style={{ width: '18rem' }}>
                <Card.Body>
                    <Card.Title>{patient.name} {patient.lastName}</Card.Title>
                    <ListGroup variant="flush">
                        <ListGroup.Item>ID: {patient.id}</ListGroup.Item>
                        <ListGroup.Item>Sex: {patient.sex}</ListGroup.Item>
                    </ListGroup>
                    <Button variant="outline-primary" onClick={toggleModal}>View</Button>
                </Card.Body>
                <Card.Footer>
                    <small className="text-muted">Next Appointment: {dateToReadable(patient.nextApp)}</small>
                </Card.Footer>
            </Card>
            {show && <ModalViewPatient patientInput={patient} show={show} toggleModal={toggleModal} handleDelete={handleDelete} />}
        </div>
    );
};

export default PatientItemGrid;