import React from "react";
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'

function AppItemGrid(props) {
    // const [show, setShow] = useState(false);
    // const toggleModal = () => setShow(!show);

    return (
        <div className="card-view" key={props.appointment.id}>
            <Card border='primary' style={{ width: '18rem' }}>
                <Card.Body>
                    <Card.Title>{props.appointment.names}</Card.Title>
                    <ListGroup variant="flush">
                        <ListGroup.Item>Date: {props.appointment.date}</ListGroup.Item>
                        <ListGroup.Item>ID: {props.appointment.id}</ListGroup.Item>
                        <ListGroup.Item>{props.appointment.reasons}</ListGroup.Item>
                    </ListGroup>
                    {/* <Button variant="outline-primary" onClick={toggleModal} >More Info</Button> */}
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