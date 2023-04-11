import React from 'react';
import { Button, Table } from '@mantine/core';
import KindAppointment from '../../components/customBadges/kindAppointment';
import StateAppointment from '../../components/customBadges/stateAppointment';
import { IAppointmentExtended } from '../../interfaces';
import IdBadge from '../../components/customBadges/id';
import { useNavigate } from 'react-router-dom';
import cnf from '../../config/config';
import moment from 'moment';

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
            <td>{moment(appointment.date).format(cnf.formatDateTimePretty)}</td>
            <td>
                {appointment.name} {appointment.lastName}
            </td>
            <td>
                <KindAppointment kind={appointment.kind} />
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
                    <th>Kind</th>
                    <th>Status</th>
                    <th>View</th>
                </tr>
            </thead>
            <tbody>{rows}</tbody>
        </Table>
    );
};

export default AppTableView;
