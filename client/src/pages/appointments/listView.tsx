import React from "react";
import { Button, Table } from "@mantine/core";
import KindAppointment from "../../components/kindAppointment";
import StateAppointment from "../../components/stateAppointment";
import dateToReadable from "../../tools/date";
import { IAppointmentExtended } from "../../interfaces";
import SexBadge from "../../components/sexBadge";

interface IProps {
    appointments: IAppointmentExtended[];
}

function AppTableView({ appointments }: IProps) {
    const rows = appointments.map((appointment: IAppointmentExtended) => (
        <tr key={appointment.id}>
            <td>{appointment.id}</td>
            <td>{dateToReadable(appointment.date)}</td>
            <td>
                <SexBadge sex={appointment.sex} /> {appointment.name}{" "}
                {appointment.lastName}
            </td>
            <td>
                <KindAppointment kind={appointment.reasons} />
            </td>
            <td>
                <StateAppointment state={appointment.status} />
            </td>
            <td>
                <Button variant="light">NOT IMPLEMENTED</Button>
            </td>
        </tr>
    ));

    return (
        <Table
            horizontalSpacing="md"
            verticalSpacing="md"
            highlightOnHover
            withColumnBorders
        >
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Date</th>
                    <th>Name</th>
                    <th>Reasons</th>
                    <th>Status</th>
                    <th>View</th>
                </tr>
            </thead>
            <tbody>{rows}</tbody>
        </Table>
    );
}

export default AppTableView;