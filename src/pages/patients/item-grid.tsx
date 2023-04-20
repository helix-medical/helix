import React from 'react';
import { useState } from 'react';
import ModalViewPatient from './view';
import { IPatient } from '../../interfaces';
import { Card, Text, Button, Group } from '@mantine/core';
import SexBadge from '../../components/customBadges/sex-badge';
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
                <Group position="center" mb="md">
                    <Text size="xl" weight={700}>
                        {patient.name} {patient.lastName}
                    </Text>
                </Group>
                <Group position="center">
                    <IdBadge id={patient.id ?? ''} />
                    <SexBadge sex={patient.sex} />
                </Group>
                <Button variant="light" radius="md" mt="md" fullWidth onClick={toggleModal} color='fr-yellow.4'>
                    View
                </Button>
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
