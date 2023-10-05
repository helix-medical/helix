import { Modal, Button, Grid, TextInput, Select, Text, PasswordInput, Group } from '@mantine/core';
import { useUserCreate } from './create.logic';
import ModalOverlay from '../../components/modal-overlay';

interface IProps {
    show: boolean;
    toggleModal: () => void;
}

const ModalAddUser = ({ show, toggleModal }: IProps): JSX.Element => {
    const { form, handleClick } = useUserCreate(toggleModal);

    return (
        <Modal.Root opened={show} onClose={toggleModal} padding={12}>
            <Modal.Overlay {...ModalOverlay} />
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
                            <Button variant="light" color="red" onClick={toggleModal}>
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

export { ModalAddUser };
