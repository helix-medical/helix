import React from 'react';
import { Button, Grid, Group, Modal, PasswordInput, Text, useMantineTheme } from '@mantine/core';
import { isNotEmpty, useForm } from '@mantine/form';

const ChangePassword = ({ show, toggleModal }: { show: boolean; toggleModal: () => void }): JSX.Element => {
    const handleClose = () => toggleModal();
    const theme = useMantineTheme();

    const handleClick = () => {
        if (form.validate().hasErrors) return;
        console.log(form.values);
    };

    const form = useForm({
        initialValues: {
            currentPassword: '',
            newPassword: '',
            confirmation: '',
        },
        validate: {
            currentPassword: isNotEmpty('Current password is required'),
            newPassword: isNotEmpty('New password is required'),
            confirmation: (value, values) => (value !== values.newPassword ? 'Passwords did not match' : null),
        },
    });

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
                            Change Password
                        </Text>
                    </Modal.Title>
                    <Modal.CloseButton />
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <Grid columns={12}>
                            <Grid.Col span={12}>
                                <PasswordInput
                                    label="Current Password"
                                    placeholder="Current Password"
                                    withAsterisk
                                    {...form.getInputProps('currentPassword')}
                                />
                            </Grid.Col>
                            <Grid.Col span={12}>
                                <PasswordInput
                                    label="New Password"
                                    placeholder="New Password"
                                    withAsterisk
                                    {...form.getInputProps('newPassword')}
                                />
                            </Grid.Col>
                            <Grid.Col span={12}>
                                <PasswordInput
                                    label="Confirm Password"
                                    placeholder="Confirm Password"
                                    withAsterisk
                                    {...form.getInputProps('confirmation')}
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
                                Change
                            </Button>
                        </Group>
                    </form>
                </Modal.Body>
            </Modal.Content>
        </Modal.Root>
    );
};

export default ChangePassword;
