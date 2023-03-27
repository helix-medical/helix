import React from "react";
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import KindAppointment from "../../components/kindAppointment";
import StateAppointment from "../../components/stateAppointment";
import dateToReadable from "../../tools/date";
import { IAppointmentExtended } from "../../interfaces";

interface IProps {
    appointment: IAppointmentExtended;
}

function AppItemGrid({ appointment }: IProps): JSX.Element {
    const handleClick = () => {
        window.location.href = `/appointments/${appointment.id}/view`;
    };

    return (
        <div className="card-view" key={appointment.id}>
            <Card border='primary' style={{ width: '18rem' }}>
                <Card.Body>
                    <Card.Title>{appointment.name} {appointment.lastName} ({appointment.sex})</Card.Title>
                    <ListGroup variant="flush">
                        <ListGroup.Item>Date: {dateToReadable(appointment.date)}</ListGroup.Item>
                        <ListGroup.Item>Kind: <KindAppointment kind={appointment.reasons} /></ListGroup.Item>
                        <ListGroup.Item>Status: <StateAppointment state={appointment.status} /></ListGroup.Item>
                    </ListGroup>
                    <Button variant="outline-primary" onClick={handleClick}>View</Button>
                </Card.Body>
                <Card.Footer>
                    <small className="text-muted">ID: {appointment.id}</small>
                </Card.Footer>
            </Card>
        </div >
    );
};

export default AppItemGrid;