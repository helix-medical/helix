import React from "react";
import Badge from "react-bootstrap/Badge";

const PreviousAppointments = ({ passif }) => {
    return (
        <div className="step">
            <h3>
                Previous Appointments&nbsp;
                <Badge pill bg='secondary'>{passif.lastAppointments.length - 1}</Badge>&nbsp;
                <Badge bg='danger'>NOT IMPLEMENTED</Badge>
            </h3>
        </div>
    );
};

export default PreviousAppointments;