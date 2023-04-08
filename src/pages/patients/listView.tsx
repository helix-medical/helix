import React from 'react';
import { Button, Table } from '@mantine/core';
import { IPatient } from '../../interfaces';
import SexBadge from '../../components/customBadges/sexBadge';
import IdBadge from '../../components/customBadges/id';

interface IProps {
    patients: IPatient[];
}

function PatientsTableView({ patients }: IProps): JSX.Element {
    const rows = patients.map((patient: IPatient) => (
        <tr key={patient.id}>
            <td>
                <IdBadge id={patient.id ?? ''} />
            </td>
            <td>{patient.name}</td>
            <td>{patient.lastName}</td>
            <td>{patient.birthDate}</td>
            <td>
                <SexBadge sex={patient.sex} />
            </td>
            <td>{patient.city}</td>
            <td>{patient.email}</td>
            <td>
                <Button variant="light">NOT IMPLEMENTED</Button>
            </td>
        </tr>
    ));

    return (
        <Table horizontalSpacing="md" verticalSpacing="md" className="debug" highlightOnHover withColumnBorders>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Last Name</th>
                    <th>Birth Date</th>
                    <th>Sex</th>
                    <th>City</th>
                    <th>Email</th>
                    <th>View</th>
                </tr>
            </thead>
            <tbody>{rows}</tbody>
        </Table>
    );
}

export default PatientsTableView;
