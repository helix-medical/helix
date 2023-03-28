import React from "react";
import { Badge } from "@mantine/core";

interface IProps {
    state: string;
}

function StateAppointment({ state }: IProps): JSX.Element {
    return (
        <Badge
            color={state === 'pending' ? 'blue' : 'green'}
        >
            {state === 'pending' ? 'Pending' : 'Finished'}
        </Badge>
    );
};

export default StateAppointment;