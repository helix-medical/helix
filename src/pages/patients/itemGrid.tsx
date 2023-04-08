import React from 'react';
import { useState } from 'react';
import dateToReadable from '../../tools/date';
import ModalViewPatient from './view';
import { IPatient } from '../../interfaces';
import { Card, Text, Button, Group, List } from '@mantine/core';
import SexBadge from '../../components/customBadges/sexBadge';
import IdBadge from '../../components/customBadges/id';

interface IProps {
    patient: IPatient;
    handleDelete: (id: string | undefined) => void;
}

function PatientItemGrid({ patient, handleDelete }: IProps): JSX.Element {
    const [show, setShow] = useState(false);
    const toggleModal = () => setShow(!show);

    return (
        <div key={patient.id}>
            <Card radius="md" withBorder shadow="sm" padding="lg">
                <Group position="center" mt="md" mb="xs">
                    <Text size="xl" weight={500}>
                        {patient.name} {patient.lastName}
                    </Text>
                    <SexBadge sex={patient.sex} />
                </Group>
                <List>
                    <List.Item>
                        ID: <IdBadge id={patient.id ?? ''} />
                    </List.Item>
                </List>
                <Button variant="light" radius="md" mt="md" fullWidth onClick={toggleModal}>
                    View
                </Button>
                <Text color="dimmed" size="sm">
                    Next App: {dateToReadable(patient.nextApp)}
                </Text>
            </Card>
            {show && (
                <ModalViewPatient
                    patientInput={patient}
                    show={show}
                    toggleModal={toggleModal}
                    handleDelete={handleDelete}
                />
            )}
        </div>
    );
}

export default PatientItemGrid;
