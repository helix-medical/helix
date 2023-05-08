import { Avatar, Button, Divider, Group, Title } from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';
import GrantAccess from '../../components/auth/grant-access';
import { usePatientNavBar } from './navbar.logic';
import { IPatient } from './types';
import { usePatientContext } from './patient.context';
import { useEffect } from 'react';

const PatientNavBar = ({ form }: { form: UseFormReturnType<IPatient> }) => {
    const { handleDelete, handleUpdate, update } = usePatientNavBar(form);
    const { setUpdate } = usePatientContext();
    useEffect(() => {
        setUpdate(update);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [update]);
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
                        <Button variant="light" color="green" size="sm" onClick={(event) => handleUpdate(event)}>
                            {update ? 'Save' : 'Update'}
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
