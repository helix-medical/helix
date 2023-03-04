import React from "react";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/esm/Badge";

function Appointments() {
    return (
        <>
            <h2>## Appointments <Badge bg='secondary' pill>10</Badge></h2>
            <Button variant="primary">Create a Appointment</Button>
        </>
    );
}

export default Appointments;