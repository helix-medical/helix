import React, { useState } from 'react';
import { Table, ActionIcon, Flex, Title, Grid, Badge, Group, Button, Alert } from '@mantine/core';
import { IUsers } from '../../interfaces';
import RoleBadge from '../../components/userBadge';
import { IconCheck, IconEdit, IconEye, IconTrash, IconX } from '@tabler/icons-react';
import IdBadge from '../../components/id';
import ModalAddUser from './create';

const AlertCallBack = ({
    message,
    fail,
    show,
    handleClose,
}: {
    message: string;
    fail: boolean;
    show: boolean;
    handleClose: any;
}): JSX.Element => {
    const icon = fail ? <IconX size="1.1rem" /> : <IconCheck size="1.1rem" />;
    return (
        <>
            {show ? (
                <Alert
                    icon={icon}
                    color={fail ? 'red' : 'green'}
                    onClose={handleClose}
                    title={fail ? 'Error' : 'Success'}
                    withCloseButton
                >
                    {message}
                </Alert>
            ) : null}
        </>
    );
};

const ListUsers = ({ users }: { users: IUsers[] }): JSX.Element => {
    const [show, setShow] = useState(false);
    const [showNotif, setShowNotif] = useState(false);
    const toggleModal = () => {
        setShow(!show);
        if (show) {
            setShowNotif(true);
        }
    };

    const handleClose = () => setShowNotif(false);

    const [newUser, setNewUser] = useState({
        fail: true,
        message: 'No data',
    });

    return (
        <>
            <AlertCallBack message={newUser.message} fail={newUser.fail} show={showNotif} handleClose={handleClose} />
            <Grid justify="space-between" align="center" p="md">
                <Group>
                    <Title order={2}>
                        Users{' '}
                        <Badge size="lg" radius="lg" variant="filled">
                            {users.length}
                        </Badge>
                    </Title>
                </Group>
                <Group>
                    <Button onClick={toggleModal}>New User</Button>
                </Group>
            </Grid>
            <Table horizontalSpacing="md" verticalSpacing="md" highlightOnHover withColumnBorders>
                <thead>
                    <tr>
                        <th>UID</th>
                        <th>Account</th>
                        <th>Password</th>
                        <th>Clear PWD</th>
                        <th>Role</th>
                        <th>State</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.uid}>
                            <td>
                                <IdBadge id={user.uid ?? ''} />
                            </td>
                            <td>
                                {user.name} {user.lastName}
                            </td>
                            <td>{user.password}</td>
                            <td>{user.clearPassword}</td>
                            <td>
                                <RoleBadge role={user.role} />
                            </td>
                            <td>{user.state}</td>
                            <td>
                                <Flex>
                                    <ActionIcon color="blue" variant="light" mx="xs" size="lg">
                                        <IconEye size="1rem" />
                                    </ActionIcon>
                                    <ActionIcon color="green" variant="light" mx="xs" size="lg">
                                        <IconEdit size="1rem" />
                                    </ActionIcon>
                                    <ActionIcon color="red" variant="light" mx="xs" size="lg">
                                        <IconTrash size="1rem" />
                                    </ActionIcon>
                                </Flex>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <ModalAddUser show={show} toggleModal={toggleModal} handler={setNewUser} />
        </>
    );
};

export default ListUsers;
