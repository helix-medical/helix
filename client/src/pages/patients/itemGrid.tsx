import React from "react";
import { useState } from "react";
import dateToReadable from "../../tools/date";
import ModalViewPatient from "./view";
import { IPatient } from "../../interfaces";
import { Card, Text, Button, Group, List } from '@mantine/core';
import SexBadge from "../../components/sexBadge";
import Id from "../../components/id";

interface IProps {
    patient: IPatient;
    handleDelete: (id: number | undefined) => void;
}

function PatientItemGrid({ patient, handleDelete }: IProps): JSX.Element {
    const [show, setShow] = useState(false);
    const toggleModal = () => setShow(!show);

    return (
        <div key={patient.id}>
            <Card radius="md" withBorder shadow="sm" padding="lg" /*border='primary' style={{ width: '18rem' }}*/>
                <Group position="center" mt="md" mb="xs">
                    <Text size="xl" weight={500}>{patient.name} {patient.lastName}</Text>
                    <SexBadge sex={patient.sex}/>
                </Group>
                <List>
                    <List.Item>ID: <Id id={patient.id ?? 0} /></List.Item>
                </List>
                <Button variant="light" radius="md" mt="md" fullWidth onClick={toggleModal}>View</Button>
                <Text color="dimmed" size="sm">Next App: {dateToReadable(patient.nextApp)}</Text>
            </Card>
            {show && <ModalViewPatient patientInput={patient} show={show} toggleModal={toggleModal} handleDelete={handleDelete} />}
        </div>
    );
};

export default PatientItemGrid;