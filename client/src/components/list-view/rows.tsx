import { ActionIcon, Button, Flex, Table } from '@mantine/core';
import { ID, KindAppointment, Role, UserStatus } from '../custom-badges';
import moment from 'moment/moment';
import cnf from '../../config/config.ts';
import { IconEdit, IconExternalLink, IconEye, IconTrash } from '@tabler/icons-react';

const CreateRows = ({ type, item, callbacks }: { type: string; item: any; callbacks: ((id: string) => void)[] }) => {
  if (type === 'patients') {
    return (
      <Table.Tr key={item.id}>
        <Table.Td>
          <ID id={item.id ?? ''} color="yellow" />
        </Table.Td>
        <Table.Td>{item.name}</Table.Td>
        <Table.Td>{item.lastName}</Table.Td>
        <Table.Td>{moment(item.birthDate).format(cnf.formatDatePretty)}</Table.Td>
        <Table.Td>{item.email}</Table.Td>
        <Table.Td>
          <Flex>
            <Button color="yellow" variant="light" mx="xs" onClick={() => callbacks[0](item.id)}>
              View
            </Button>
            <ActionIcon color="red" variant="light" mx="xs" size="lg">
              <IconTrash size="1rem" />
            </ActionIcon>
          </Flex>
        </Table.Td>
      </Table.Tr>
    );
  }

  if (type === 'appointments') {
    return (
      <Table.Tr key={item.id}>
        <Table.Td>
          <ID id={item.id ?? ''} color="orange" />
        </Table.Td>
        <Table.Td>{item.name}</Table.Td>
        <Table.Td>{item.lastName}</Table.Td>
        <Table.Td>{moment(item.date).format(cnf.formatDateTimePretty)}</Table.Td>
        <Table.Td>
          <KindAppointment kind={item.kind} />
        </Table.Td>
        <Table.Td>
          <Flex>
            <ActionIcon color="orange" variant="light" mx="xs" size="lg" onClick={() => callbacks[0](item.id)}>
              <IconEye size="1rem" />
            </ActionIcon>
            <ActionIcon color="green" variant="light" mx="xs" size="lg">
              <IconExternalLink size="1rem" />
            </ActionIcon>
            <ActionIcon color="red" variant="light" mx="xs" size="lg">
              <IconTrash size="1rem" />
            </ActionIcon>
          </Flex>
        </Table.Td>
      </Table.Tr>
    );
  }

  if (type === 'accounting') {
    return (
      <Table.Tr key={item.uid}>
        <Table.Td>
          <ID id={item.uid ?? ''} color="green" />
        </Table.Td>
        <Table.Td>€{item.amount}</Table.Td>
        <Table.Td>
          {item.patientName} {item.patientLastName}
        </Table.Td>
        <Table.Td>{moment(item.date).format(cnf.formatDateTimePretty)}</Table.Td>
        <Table.Td>
          <KindAppointment kind={item.method} />
        </Table.Td>
        <Table.Td>
          <Flex>
            <ActionIcon color="green" variant="light" mx="xs" size="lg" onClick={() => callbacks[0](item.uid)}>
              <IconEye size="1rem" />
            </ActionIcon>
            <ActionIcon color="red" variant="light" mx="xs" size="lg">
              <IconTrash size="1rem" />
            </ActionIcon>
          </Flex>
        </Table.Td>
      </Table.Tr>
    );
  }

  if (type === 'users') {
    return (
      <Table.Tr key={item.uid}>
        <Table.Td>
          <ID id={item.uid ?? ''} color="blue" />
        </Table.Td>
        <Table.Td>
          {item.name} {item.lastName}
        </Table.Td>
        <Table.Td>
          <UserStatus status={item.state} />
        </Table.Td>
        <Table.Td>{moment(item.lastActive).format(cnf.formatDateTimePretty)}</Table.Td>
        <Table.Td>
          <Role role={item.role} />
        </Table.Td>
        <Table.Td>
          <Flex>
            <ActionIcon color="blue" variant="light" mx="xs" size="lg" onClick={() => callbacks[0](item.uid)}>
              <IconEye size="1rem" />
            </ActionIcon>
            <ActionIcon color="green" variant="light" mx="xs" size="lg">
              <IconEdit size="1rem" />
            </ActionIcon>
            <ActionIcon color="red" variant="light" mx="xs" size="lg">
              <IconTrash size="1rem" />
            </ActionIcon>
          </Flex>
        </Table.Td>
      </Table.Tr>
    );
  }
};

export { CreateRows };
