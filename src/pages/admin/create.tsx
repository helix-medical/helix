import React from 'react';
import { Modal, Button, Grid, TextInput, Select, Text, PasswordInput, Group, useMantineTheme } from '@mantine/core';
import { useForm, isNotEmpty } from '@mantine/form';
import setNotification from '../../components/errors/feedback-notification';
import useApplicationRoutes from '../../api/routes';

interface IProps {
    show: boolean;
    toggleModal: () => void;
}

const ModalAddUser = ({ show, toggleModal }: IProps): JSX.Element => {
    const routes = useApplicationRoutes();
    const handleClose = () => toggleModal();
    const theme = useMantineTheme();

    const form = useForm({
        initialValues: {
            name: '',
            lastName: '',
            role: '',
            password: '',
        },

        validate: {
            name: (value) => (value.length < 2 ? 'Name must be at least 2 chars' : null),
            lastName: (value) => (value.length < 2 ? 'Last name must be at least 2 chars' : null),
            role: isNotEmpty('Role is required'),
            password: isNotEmpty('Password is required'),
        },
    });

    const handleClick = async (e: { preventDefault: () => void }) => {
        e.preventDefault();
        if (form.validate().hasErrors) return;
        try {
            const res = await routes.users.create(form.values); 
            setNotification(false, res.data.message);
            form.reset();
            toggleModal();
        } catch (error: any) {
            if (!error?.response) setNotification(true, 'Network error');
            else setNotification(true, `${error.message}: ${error.response.data.message}`);
        }
    };

    return (
        <Modal.Root opened={show} onClose={handleClose} padding={12}>
            <Modal.Overlay
                color={theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2]}
                opacity={0.55}
                blur={3}
            />
            <Modal.Content>
                <Modal.Header>
                    <Modal.Title>
                        <Text size="xl" weight={700}>
                            Add User
                        </Text>
                    </Modal.Title>
                    <Modal.CloseButton />
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <Grid columns={12}>
                            <Grid.Col span={6}>
                                <TextInput
                                    label="Name"
                                    placeholder="Name"
                                    withAsterisk
                                    {...form.getInputProps('name')}
                                />
                            </Grid.Col>
                            <Grid.Col span={6}>
                                <TextInput
                                    label="Last Name"
                                    placeholder="Last Name"
                                    withAsterisk
                                    {...form.getInputProps('lastName')}
                                />
                            </Grid.Col>
                            <Grid.Col span={12}>
                                <Select
                                    label="Role"
                                    placeholder="Role"
                                    data={[
                                        { label: 'Admin', value: 'admin' },
                                        { label: 'Practitioner', value: 'practitioner' },
                                        { label: 'Secretary', value: 'secretary' },
                                    ]}
                                    withAsterisk
                                    {...form.getInputProps('role')}
                                />
                            </Grid.Col>
                            <Grid.Col span={12}>
                                <PasswordInput
                                    label="Password"
                                    placeholder="Password"
                                    withAsterisk
                                    {...form.getInputProps('password')}
                                />
                            </Grid.Col>
                        </Grid>
                        <Group position="right" p="md">
                            <Button variant="light" color="red" onClick={handleClose}>
                                Cancel
                            </Button>
                            <Button
                                color="green"
                                onClick={handleClick}
                                // type="submit"
                            >
                                Add
                            </Button>
                        </Group>
                    </form>
                </Modal.Body>
            </Modal.Content>
        </Modal.Root>
    );
};

export default ModalAddUser;
