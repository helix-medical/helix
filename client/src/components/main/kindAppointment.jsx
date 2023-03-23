import React from "react";
import Badge from "react-bootstrap/Badge";

function KindAppointment(props) {
    let color = 'primary';
    if (props.kind === 'follow-up')
        color = 'primary';
    if (props.kind === 'first-visit')
        color = 'success';
    if (props.kind === 'emergency')
        color = 'danger';
    if (props.kind === 'pediatrics')
        color = 'warning';
    if (props.kind === 'maternity')
        color = 'info';

    return (
        <Badge bg={color} className="mb-3">{props.kind}</Badge>
    )
}

export default KindAppointment;