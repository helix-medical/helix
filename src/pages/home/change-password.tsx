import React from 'react';
import { Button, Grid, Group, Modal, PasswordInput, Text } from '@mantine/core';
import { isNotEmpty, useForm } from '@mantine/form';
import { ForceOMeter } from '../../components/force-o-meter';
import ModalOverlay from '../../components/modal-overlay';

const ChangePassword = ({ show, toggleModal }: { show: boolean; toggleModal: () => void }): JSX.Element => {
    const handleClose = () => toggleModal();

    const handleClick = () => {
        if (form.validate().hasErrors) return;
        console.log(form.values);
    };

    const changePassword = (value: string) => {
        form.setFieldValue('newPassword', value);
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
            <Modal.Overlay {...ModalOverlay} />
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
                                <ForceOMeter
                                    value={form.values.newPassword}
                                    setValue={(value) => changePassword(value)}
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
