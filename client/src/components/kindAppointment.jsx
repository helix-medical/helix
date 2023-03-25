import React from "react";
import Badge from "react-bootstrap/Badge";

function KindAppointment({ kind }) {
    let color = 'primary';
    if (kind === 'follow-up')
        color = 'primary';
    if (kind === 'first-visit')
        color = 'success';
    if (kind === 'emergency')
        color = 'danger';
    if (kind === 'pediatrics')
        color = 'warning';
    if (kind === 'maternity')
        color = 'info';

    return (
        <Badge bg={color} className="mb-3">{kind}</Badge>
    )
}

export default KindAppointment;