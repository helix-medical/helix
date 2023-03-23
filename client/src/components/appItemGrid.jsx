import React from "react";
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import KindAppointment from "./main/kindAppointment";
import Badge from 'react-bootstrap/Badge'
import dateToReadable from "../utils/date";

const status = (state) => {
    if (state === "finished")
        return (<Badge bg='success'>Finished</Badge>)
    if (state === "pending")
        return (<Badge bg='primary'>Pending</Badge>)
}

function AppItemGrid(props) {
    // const [show, setShow] = useState(false);
    // const toggleModal = () => setShow(!show);
    const handleClick = () => {
        window.location.href = `http://${process.env.REACT_APP_FRONTEND}/appointments/${props.appointment.id}/view`;
    }

    return (
        <div className="card-view" key={props.appointment.id}>
            <Card border='primary' style={{ width: '18rem' }} onClick={handleClick}>
                <Card.Body>
                    <Card.Title>{props.appointment.name} {props.appointment.lastName} ({props.appointment.sex})</Card.Title>
                    <ListGroup variant="flush">
                        <ListGroup.Item>Date: {dateToReadable(props.appointment.date)}</ListGroup.Item>
                        <ListGroup.Item>Kind: <KindAppointment kind={props.appointment.reasons} /></ListGroup.Item>
                        <ListGroup.Item>Status: {status(props.appointment.status)}</ListGroup.Item>
                    </ListGroup>
                    {/* <Button variant="outline-primary">View</Button> */}
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