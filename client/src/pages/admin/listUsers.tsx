import React from 'react';
import { Table, ActionIcon, Flex } from '@mantine/core';
import { IUsers } from '../../interfaces';
import RoleBadge from '../../components/userBadge';
import { IconEdit, IconEye, IconTrash } from '@tabler/icons-react';

const ListUsers = ({ users }: { users: IUsers[] }): JSX.Element => {
    return (
        <Table horizontalSpacing="md" verticalSpacing="md" highlightOnHover withColumnBorders>
            <thead>
                <tr>
                    <th>Username</th>
                    <th>Password</th>
                    <th>Role</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {users.map((user) => (
                    <tr key={user.id}>
                        <td>{user.username}</td>
                        <td>{user.password}</td>
                        <td>
                            <RoleBadge role={user.role} />
                        </td>
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
    );
};

export default ListUsers;
