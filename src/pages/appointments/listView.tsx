import React from 'react';
import { Button, Table } from '@mantine/core';
import KindAppointment from '../../components/kindAppointment';
import StateAppointment from '../../components/stateAppointment';
import dateToReadable from '../../tools/date';
import { IAppointmentExtended } from '../../interfaces';
import SexBadge from '../../components/sexBadge';
import IdBadge from '../../components/id';
import { useNavigate } from 'react-router-dom';

interface IProps {
    appointments: IAppointmentExtended[];
}

const AppTableView = ({ appointments }: IProps): JSX.Element => {
    const navigate = useNavigate();
    const rows = appointments.map((appointment: IAppointmentExtended) => (
        <tr key={appointment.id}>
            <td>
                <IdBadge id={appointment.id ?? ''} />
            </td>
            <td>{dateToReadable(appointment.date)}</td>
            <td>
                <SexBadge sex={appointment.sex} /> {appointment.name} {appointment.lastName}
            </td>
            <td>
                <KindAppointment kind={appointment.reasons} />
            </td>
            <td>
                <StateAppointment state={appointment.status} />
            </td>
            <td>
                <Button variant="light" onClick={() => navigate(`/appointments/${appointment.id}/view`)}>
                    View
                </Button>
            </td>
        </tr>
    ));

    return (
        <Table horizontalSpacing="md" verticalSpacing="md" highlightOnHover withColumnBorders>
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
};

export default AppTableView;
