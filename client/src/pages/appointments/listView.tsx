import React from "react";
import Table from "react-bootstrap/Table";
import KindAppointment from "../../components/kindAppointment";
import StateAppointment from "../../components/stateAppointment";
import dateToReadable from "../../tools/date";
import { IAppointmentExtended } from "../../interfaces";

interface IProps {
    appointments: IAppointmentExtended[];
}

function AppTableView({ appointments }: IProps) {
    return (
        <Table striped bordered hover responsive className="debug">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Date</th>
                    <th>Name</th>
                    <th>Reasons</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                {appointments.map((appointment) => (
                    <tr key={appointment.id}>
                        <td>{appointment.id}</td>
                        <td>{dateToReadable(appointment.date)}</td>
                        <td>{appointment.name} {appointment.lastName} ({appointment.sex})</td>
                        <td><KindAppointment kind={appointment.reasons} /></td>
                        <td><StateAppointment state={appointment.status} /></td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
};

export default AppTableView;