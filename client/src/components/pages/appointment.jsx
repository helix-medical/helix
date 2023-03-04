import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function Appointment(props) {
    return (
        <div className="appointment">
            <h1>Appointment</h1>
            <Form>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Appointment Date</Form.Label>
                    <Form.Control type="date" placeholder="Enter date" />
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Appointment Time</Form.Label>
                    <Form.Control type="time" placeholder="Enter time" />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    )
}

export default Appointment;