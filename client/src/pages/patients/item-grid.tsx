import { Button, Card, Group, Text } from '@mantine/core';
import { ID, Sex } from '../../components/custom-badges';
import { useNavigate } from 'react-router-dom';
import { IPatientGridView } from './types';

function PatientItemGrid({ patient }: { patient: IPatientGridView }): JSX.Element {
  const navigate = useNavigate();
  const navigateToPatient = () => navigate(`/patients/${patient.id}`);

  return (
    <Card radius="md" withBorder shadow="sm" padding="lg" key={patient.id}>
      <Group align="center" mb="md">
        <Text size="xl" fw={700}>
          {patient.name} {patient.lastName}
        </Text>
      </Group>
      <Group align="center">
        <ID id={patient.id ?? ''} />
        <Sex sex={patient.sex} />
      </Group>
      <Button variant="light" radius="md" mt="md" fullWidth onClick={navigateToPatient} color="fr-yellow.4">
        View
      </Button>
    </Card>
  );
}

export { PatientItemGrid };
