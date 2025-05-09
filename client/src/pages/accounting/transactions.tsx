import { Badge, Grid, Group, Paper, SegmentedControl, Title } from '@mantine/core';
import ExportAccounting from './export';
import ViewPDF from '../../components/pdf/viewer';
import { useTransactions } from './transactions.logic';
import HelixTableSort from '../../components/list-view';

const Transactions = (): JSX.Element => {
  const { transactions, handleClick, toggleModal, view, setView, showFacture, id } = useTransactions();
  // const { sortedData, search, handleSearchChange, reverseSortDirection, sortBy, setSorting } =
  //   useListView<ITransactions>(transactions);
  //
  // const rows = sortedData.map((row) => (
  //   <tr key={row.uid}>
  //     <td>
  //       <ID id={row.uid ?? ''} color="teal" />
  //     </td>
  //     <td>
  //       <Text fw={700}>€{row.amount}</Text>
  //     </td>
  //     <td>
  //       {row.patientName} {row.patientLastName}
  //     </td>
  //
  //     <td>{moment(row.date).format(cnf.formatDatePretty)}</td>
  //     <td>
  //       <PaymentMethod method={row.method} />
  //     </td>
  //     <td>
  //       <Button color="teal" radius="sm" variant="light" onClick={() => handleClick(row.uid)}>
  //         View
  //       </Button>
  //     </td>
  //   </tr>
  // ));

  return (
    <Paper shadow="sm" radius="md" p="lg" withBorder my="lg">
      <Grid justify="space-between" align="center" p="md">
        <Title order={2}>
          All Transactions{' '}
          <Badge size="lg" radius="lg" variant="filled" color="teal">
            {transactions.length}
          </Badge>
        </Title>
        <Group>
          <SegmentedControl
            value={view}
            color="teal"
            onChange={(value) => setView(value)}
            data={[
              { label: 'Weekly', value: 'week' },
              { label: 'Monthly', value: 'month' },
              { label: 'All', value: 'all' },
            ]}
            radius="md"
          />
          <ExportAccounting period={view} />
        </Group>
      </Grid>
      <HelixTableSort data={transactions} type="accounting" callbacks={[handleClick]} />
      {showFacture && <ViewPDF open={showFacture} handler={toggleModal} id={id} type="facture" />}
    </Paper>
  );
};

export { Transactions };
