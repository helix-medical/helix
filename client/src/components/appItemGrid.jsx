import React from "react";
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import KindAppointment from "./kindAppointment";

function AppItemGrid(props) {
    // const [show, setShow] = useState(false);
    // const toggleModal = () => setShow(!show);

    return (
        <div className="card-view" key={props.appointment.id}>
            <Card border='primary' style={{ width: '18rem' }}>
                <Card.Body>
                    <Card.Title>{props.appointment.name} {props.appointment.lastName} ({props.appointment.sex})</Card.Title>
                    <ListGroup variant="flush">
                        <ListGroup.Item>Date: {props.appointment.date}</ListGroup.Item>
                        <ListGroup.Item><KindAppointment kind={props.appointment.reasons} /></ListGroup.Item>
                    </ListGroup>
                    {/* <Button variant="outline-primary" onClick={toggleModal} >More Info</Button> */}
                </Card.Body>
                <Card.Footer>
                    <small className="text-muted">ID: {props.appointment.id}</small>
                </Card.Footer>
            </Card>
            {/* {show && <ModalViewPatient patient={props.patient} show={show} toggleModal={toggleModal} handleDelete={props.handleDelete} />} */}
        </div>
    );
}

export default AppItemGrid;