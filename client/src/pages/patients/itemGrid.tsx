import React from "react";
import { useState } from "react";
import dateToReadable from "../../tools/date";
import ModalViewPatient from "./view";
import { IPatient } from "../../interfaces";
import { Card, Text, Button, Group, List } from '@mantine/core';

interface IProps {
    patient: IPatient;
    handleDelete: (id: number | undefined) => void;
}

function PatientItemGrid({ patient, handleDelete }: IProps): JSX.Element {
    const [show, setShow] = useState(false);
    const toggleModal = () => setShow(!show);

    return (
        <div className="card-view" key={patient.id}>
            <Card radius="md" withBorder shadow="sm" padding="lg" /*border='primary' style={{ width: '18rem' }}*/>
                <Group position="apart" mt="md" mb="xs">
                    <Text size="xl" weight={500}>{patient.name} {patient.lastName}</Text>
                </Group>
                <List>
                    <List.Item>ID: {patient.id}</List.Item>
                    <List.Item>Sex: {patient.sex}</List.Item>
                </List>
                <Button variant="light" radius="md" mt="md" fullWidth onClick={toggleModal}>View</Button>
                <Text color="dimmed" size="sm">Next Appointment: {dateToReadable(patient.nextApp)}</Text>
            </Card>
            {show && <ModalViewPatient patientInput={patient} show={show} toggleModal={toggleModal} handleDelete={handleDelete} />}
        </div>
    );
};

export default PatientItemGrid;