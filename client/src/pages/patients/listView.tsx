import React from "react";
import Table from "react-bootstrap/Table";
import { IPatient } from "../../interfaces";

interface IProps {
    patients: IPatient[];
}

function PatientsTableView({ patients }: IProps): JSX.Element {
    return (
        <Table striped bordered hover responsive className="debug">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Last Name</th>
                    <th>Birth Date</th>
                    <th>Sex</th>
                    <th>City</th>
                    <th>Email</th>
                </tr>
            </thead>
            <tbody>
                {patients.map((patient: IPatient) => (
                    <tr key={patient.id}>
                        <td>{patient.id}</td>
                        <td>{patient.name}</td>
                        <td>{patient.lastName}</td>
                        <td>{patient.birthDate}</td>
                        <td>{patient.sex}</td>
                        <td>{patient.city}</td>
                        <td>{patient.email}</td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
};

export default PatientsTableView;