import React from 'react';
import { Card, Text, Button, Group } from '@mantine/core';
import SexBadge from '../../components/customBadges/sex-badge';
import IdBadge from '../../components/customBadges/id';
import { useNavigate } from 'react-router-dom';
import { IPatientGridView } from './types';

function PatientItemGrid({ patient }: { patient: IPatientGridView }): JSX.Element {
    const navigate = useNavigate();
    const navigateToPatient = () => navigate(`/patients/${patient.id}`);

    return (
        <Card radius="md" withBorder shadow="sm" padding="lg" key={patient.id}>
            <Group position="center" mb="md">
                <Text size="xl" weight={700}>
                    {patient.name} {patient.lastName}
                </Text>
            </Group>
            <Group position="center">
                <IdBadge id={patient.id ?? ''} />
                <SexBadge sex={patient.sex} />
            </Group>
            <Button variant="light" radius="md" mt="md" fullWidth onClick={navigateToPatient} color="fr-yellow.4">
                View
            </Button>
        </Card>
    );
}

export { PatientItemGrid };
