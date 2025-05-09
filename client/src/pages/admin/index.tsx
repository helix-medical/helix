import { Card, Center, Title } from '@mantine/core';
import { ListUsers } from './users';

const AdminPanel = (): JSX.Element => (
  <Card shadow="sm" padding="lg" radius="md" withBorder>
    <Center>
      <Title order={2}>Admin Panel</Title>
    </Center>
    <ListUsers />
  </Card>
);

export default AdminPanel;
