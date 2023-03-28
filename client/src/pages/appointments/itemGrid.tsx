import React from "react";
import { Card, Text, Button, Group, List } from '@mantine/core';
import KindAppointment from "../../components/kindAppointment";
import StateAppointment from "../../components/stateAppointment";
import dateToReadable from "../../tools/date";
import { IAppointmentExtended } from "../../interfaces";

interface IProps {
    appointment: IAppointmentExtended;
}

function AppItemGrid({ appointment }: IProps): JSX.Element {
    const handleClick = () => {
        window.location.href = `/appointments/${appointment.id}/view`;
    };

    return (
        <div className="card-view" key={appointment.id}>
            <Card radius="md" withBorder shadow="sm" padding="lg" >
                <Group position="apart" mt="md" mb="xs">
                    <Text size='xl' weight={500}>{appointment.name} {appointment.lastName} ({appointment.sex})</Text>
                </Group>
                <List>
                    <List.Item>Date: {dateToReadable(appointment.date)}</List.Item>
                    <List.Item>Kind: <KindAppointment kind={appointment.reasons} /></List.Item>
                    <List.Item>Status: <StateAppointment state={appointment.status} /></List.Item>
                </List>
                <Button variant="light" radius="md" mt="md" fullWidth onClick={handleClick}>View</Button>
                <Text color="dimmed" size='sm'>ID: {appointment.id}</Text>
            </Card>
        </div >
    );
};

export default AppItemGrid;