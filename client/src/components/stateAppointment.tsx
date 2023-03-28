import React from "react";
import Badge from "react-bootstrap/Badge";

interface IProps {
    state: string;
}

function StateAppointment({ state }: IProps): JSX.Element {
    return (
        <Badge
            bg={state === 'pending' ? 'primary' : 'success'}
        >
            {state === 'pending' ? 'Pending' : 'Finished'}
        </Badge>
    );
};

export default StateAppointment;