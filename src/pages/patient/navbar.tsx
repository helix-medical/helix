import { Avatar, Button, Divider, Group, Title } from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';
import GrantAccess from '../../components/auth/grant-access';
import { usePatient } from './patient.logic';

const PatientNavBar = ({ form }: { form: UseFormReturnType<any> }) => {
    const { handleDelete } = usePatient(form.values.id);
    return (
        <>
            <Group position="apart" mt="md">
                <Group position="left">
                    <Avatar
                        size="lg"
                        radius="lg"
                        color="fr-yellow.3"
                    >{`${form.values.name[0]}${form.values.lastName[0]}`}</Avatar>
                    <Title order={1}>
                        {form.values.name} {form.values.lastName}
                    </Title>
                </Group>
                <Group position="right">
                    <GrantAccess levels={['ADMIN', 'PRACTITIONER']}>
                        <Button variant="light" color="red" size="sm" onClick={() => handleDelete(form.values.id)}>
                            Delete
                        </Button>
                        <Button variant="light" color="green" size="sm">
                            Edit
                        </Button>
                    </GrantAccess>
                    <Button variant="light" color="blue" size="sm">
                        Export
                    </Button>
                </Group>
            </Group>
            <Divider my="sm" />
        </>
    );
};

export { PatientNavBar };
