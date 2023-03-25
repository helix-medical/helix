import React from "react";
import Badge from "react-bootstrap/Badge";

function StateAppointment({ state }) {
    return (
        <Badge
            bg={state === 'pending' ? 'primary' : 'success'}
        >
            {state === 'pending' ? 'Pending' : 'Finished'}
        </Badge>
    );
};

export default StateAppointment;