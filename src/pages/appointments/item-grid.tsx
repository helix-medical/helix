import React from 'react';
import { Card, Text, Button, Group } from '@mantine/core';
import {KindAppointment} from '../../components/custom-badges';
import { IAppointmentExtended } from '../../types/interfaces';
import { useNavigate } from 'react-router-dom';
import cnf from '../../config/config';
import moment from 'moment';

interface IProps {
    appointment: IAppointmentExtended;
}

const AppItemGrid = ({ appointment }: IProps): JSX.Element => {
    const navigate = useNavigate();

    return (
        <div key={appointment.id}>
            <Card radius="md" withBorder shadow="sm" padding="lg">
                <Group position="center" mb="xs">
                    <Text size="xl" weight={700}>
                        {appointment.name} {appointment.lastName}
                    </Text>
                    <Text size="sm">{moment(appointment.date).format(cnf.formatDateTimePretty)}</Text>
                    <KindAppointment kind={appointment.kind} />
                </Group>
                <Button
                    variant="light"
                    radius="md"
                    mt="md"
                    fullWidth
                    color="fr-orange.4"
                    onClick={() => navigate(`/appointments/${appointment.id}`)}
                >
                    {appointment.status !== 'pending' ? 'View' : 'Edit'}
                </Button>
            </Card>
        </div>
    );
};

export default AppItemGrid;
