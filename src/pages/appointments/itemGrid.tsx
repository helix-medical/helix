import React from 'react';
import { Card, Text, Button, Group, List } from '@mantine/core';
import KindAppointment from '../../components/customBadges/kindAppointment';
import StateAppointment from '../../components/customBadges/stateAppointment';
import dateToReadable from '../../tools/date';
import { IAppointmentExtended } from '../../interfaces';
import SexBadge from '../../components/customBadges/sexBadge';
import IdBadge from '../../components/customBadges/id';
import { useNavigate } from 'react-router-dom';

interface IProps {
    appointment: IAppointmentExtended;
}

const AppItemGrid = ({ appointment }: IProps): JSX.Element => {
    const navigate = useNavigate();

    return (
        <div key={appointment.id}>
            <Card radius="md" withBorder shadow="sm" padding="lg">
                <Group position="center" mt="md" mb="xs">
                    <Text size="xl" weight={500}>
                        {appointment.name} {appointment.lastName}
                    </Text>
                    <SexBadge sex={appointment.sex} />
                </Group>
                <List>
                    <List.Item>Date: {dateToReadable(appointment.date)}</List.Item>
                    <List.Item>
                        Kind: <KindAppointment kind={appointment.reasons} />
                    </List.Item>
                    <List.Item>
                        Status: <StateAppointment state={appointment.status} />
                    </List.Item>
                    <List.Item>
                        ID: <IdBadge id={appointment.id ?? ''} />
                    </List.Item>
                </List>
                <Button
                    variant="light"
                    radius="md"
                    mt="md"
                    fullWidth
                    onClick={() => navigate(`/appointments/${appointment.id}/view`)}
                >
                    View
                </Button>
                {/* <Text ta='right' color="dimmed" size='sm'>ID: {appointment.id}</Text> */}
            </Card>
        </div>
    );
};

export default AppItemGrid;
