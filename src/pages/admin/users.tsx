import React from 'react';
import { IconArchive, IconArchiveOff, IconEdit, IconEye } from '@tabler/icons-react';
import { ModalAddUser } from './create';
import { Role, ID, UserStatus } from '../../components/custom-badges';
import { Table, ActionIcon, Flex, Title, Badge, Group, Button, Divider } from '@mantine/core';
import { useUsers } from './users.logic';
import cnf from '../../config/config';
import moment from 'moment';

const ListUsers = (): JSX.Element => {
    const { users, toggleModal, disableUser, enableUser, show } = useUsers();
    return (
        <>
            <Group position="apart">
                <Title order={2}>
                    Users{' '}
                    <Badge size="lg" radius="lg" variant="filled">
                        {users.length}
                    </Badge>
                </Title>
                <Button onClick={toggleModal}>New User</Button>
            </Group>
            <Divider my="lg" />
            <Table horizontalSpacing="md" verticalSpacing="md" highlightOnHover withColumnBorders>
                <thead>
                    <tr>
                        <th>UID</th>
                        <th>Account</th>
                        <th>State</th>
                        <th>Last Active</th>
                        <th>Role</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.uid}>
                            <td>
                                <ID id={user.uid ?? ''} />
                            </td>
                            <td>
                                {user.name} {user.lastName}
                            </td>
                            <td>
                                <UserStatus status={user.state} />
                            </td>
                            <td>{moment(user.lastActive).format(cnf.formatDateTimePretty)}</td>
                            <td>
                                <Role role={user.role} />
                            </td>
                            <td>
                                <Flex>
                                    <ActionIcon color="blue" variant="light" mx="xs" size="lg">
                                        <IconEye size="1rem" />
                                    </ActionIcon>
                                    <ActionIcon color="green" variant="light" mx="xs" size="lg">
                                        <IconEdit size="1rem" />
                                    </ActionIcon>
                                    <ActionIcon
                                        color="red"
                                        variant="light"
                                        mx="xs"
                                        size="lg"
                                        onClick={() =>
                                            user.state === 'disabled'
                                                ? enableUser(user?.uid ?? '')
                                                : disableUser(user?.uid ?? '')
                                        }
                                    >
                                        {user.state === 'disabled' ? (
                                            <IconArchiveOff size="1rem" />
                                        ) : (
                                            <IconArchive size="1rem" />
                                        )}
                                    </ActionIcon>
                                </Flex>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <ModalAddUser show={show} toggleModal={toggleModal} />
        </>
    );
};

export { ListUsers };
