import { Avatar, Button, Divider, Group, Title } from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';
import GrantAccess from '../../components/auth/grant-access';

const PatientNavBar = ({ form }: { form: UseFormReturnType<any> }) => (
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
                    <Button variant="light" color="red" size="sm">
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

export { PatientNavBar };
