import React from "react";
import Table from "react-bootstrap/Table";
import dateToReadable from "../../tools/date";

function AppTableView(props) {
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
                {props.appointments.map((appointment) => (
                    <tr key={appointment.id}>
                        <td>{appointment.id}</td>
                        <td>{dateToReadable(appointment.date)}</td>
                        <td>{appointment.name} {appointment.lastName} ({appointment.sex})</td>
                        <td>{appointment.reasons}</td>
                        <td>{appointment.status}</td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
}

export default AppTableView;