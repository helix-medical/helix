// import axios from "axios";
import React from "react";
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
// import ModalViewPatient from "./modalViewPatient";
// import { useState } from "react";

function AppItemGrid(props) {
    // const [show, setShow] = useState(false);
    // const toggleModal = () => setShow(!show);

    // async function patientName(id) {
    //     const response = await axios.get(`http://172.16.183.69:3001/patients/${id}`);
    //     try {
    //         if (response.data.length === 0)
    //             return "Patient not found";
    //         return response.data.name;
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    // const getName = () => {
    //     patientName(props.appointment.patientId).then((name) => {
    //         console.log(name);
    //         return name;
    //     });
    // };
    // const name = getName();
    // console.log(name);

    return (
        <div className="card-view" key={props.appointment.id}>
            <Card border='primary' style={{ width: '18rem' }}>
                <Card.Body>
                    <Card.Title>Hardcoded name</Card.Title>
                    <ListGroup variant="flush">
                        <ListGroup.Item>Date: {props.appointment.date}</ListGroup.Item>
                        <ListGroup.Item>ID: {props.appointment.id}</ListGroup.Item>
                        <ListGroup.Item>{props.appointment.reasons}</ListGroup.Item>
                    </ListGroup>
                    <Button variant="outline-primary" /* onClick={toggleModal} */ >More Info</Button>
                </Card.Body>
                <Card.Footer>
                    <small className="text-muted">Patient ID: {props.appointment.patientId}</small>
                </Card.Footer>
            </Card>
            {/* {show && <ModalViewPatient patient={props.patient} show={show} toggleModal={toggleModal} handleDelete={props.handleDelete} />} */}
        </div>
    );
}

export default AppItemGrid;