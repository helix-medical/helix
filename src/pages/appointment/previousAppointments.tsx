import React from "react";
import { Badge, Title } from "@mantine/core";
import { IPassif } from "../../interfaces";

interface IProps {
    passif: IPassif;
}

const PreviousAppointments = ({ passif }: IProps): JSX.Element => {
    return (
        <>
            <Title order={3}>
                Previous Appointments{' '}
                <Badge color="gray" variant="filled" size="md">
                    {passif.lastAppointments.length - 1}
                </Badge>
                {' '}
                <Badge color="red" radius="sm" variant="filled" size="xl">
                    NOT IMPLEMENTED
                </Badge>
            </Title>
        </>
    );
};

export default PreviousAppointments;
