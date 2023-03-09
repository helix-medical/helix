import React from "react";
import Table from "react-bootstrap/Table";
import dateToReadable from "../utils/date";

function AppTableView(props) {
    return (
        <Table striped bordered hover responsive className="debug">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Date</th>
                    <th>Reasons</th>
                    <th>Patient ID</th>
                </tr>
            </thead>
            <tbody>
                {props.appointments.map((appointment) => (
                    <tr key={appointment.id}>
                        <td>{appointment.id}</td>
                        <td>{appointment.names}</td>
                        <td>{dateToReadable(appointment.date)}</td>
                        <td>{appointment.reasons}</td>
                        <td>{appointment.patientId}</td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
}

export default AppTableView;