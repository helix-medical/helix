import { Button, Divider, Paper, ScrollArea, Table, Text, Title } from '@mantine/core';
import { ITransaction } from './types';
import { usePatientAccounting } from './accounting.logic';
import moment from 'moment';
import { PaymentMethod } from '../../components/custom-badges';
import ViewPDF from '../../components/pdf/viewer';
import NoData from '../../components/table-no-data.tsx';

const rows = (data: ITransaction[], handler: (id: string) => any) =>
  data.map((transaction) => (
    <Table.Tr key={transaction.id}>
      <Table.Td>{moment(transaction.date).format('DD MMMM YYYY')}</Table.Td>
      <Table.Td>
        <Text fw={700}>€{transaction.amount}</Text>
      </Table.Td>
      <Table.Td>
        <PaymentMethod method={transaction.method} />
      </Table.Td>
      <Table.Td>
        <Button variant="light" color="teal" onClick={() => handler(transaction.id)}>
          Aperçu
        </Button>
      </Table.Td>
    </Table.Tr>
  ));

const PatientAccounting = ({ data }: { data: ITransaction[] }) => {
  const { selected, handleShowFacture, showFacture, handleHideFacture } = usePatientAccounting();
  return (
    <Paper shadow="md" p="md" radius="md" withBorder>
      <Title order={3}>Transactions</Title>
      <Divider my="sm" />
      <ScrollArea h={473}>
        <Table layout="fixed" highlightOnHover stickyHeader>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Date</Table.Th>
              <Table.Th>Montant</Table.Th>
              <Table.Th>Méthode</Table.Th>
              <Table.Th>Facture</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{data.length === 0 ? <NoData span={4} /> : rows(data, handleShowFacture)}</Table.Tbody>
        </Table>
      </ScrollArea>
      {showFacture ? <ViewPDF open={showFacture} handler={handleHideFacture} id={selected} type="facture" /> : null}
    </Paper>
  );
};

export { PatientAccounting };
