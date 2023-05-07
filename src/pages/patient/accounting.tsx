import { Button, Divider, Paper, ScrollArea, Table, Title } from '@mantine/core';
import PaymentMethod from '../../components/customBadges/payment-method';
import { ITransaction } from './types';
import moment from 'moment';

const rows = (data: ITransaction[]) =>
    data.map((transaction) => (
        <tr key={transaction.id}>
            <td>{moment(transaction.date).format('dddd DD MMMM YYYY')}</td>
            <td>{transaction.amount}€</td>
            <td>
                <PaymentMethod method={transaction.method} />
            </td>
            <td>
                <Button variant="light" color="teal">
                    View
                </Button>
            </td>
        </tr>
    ));

const NoData = () => (
    <tr>
        <td colSpan={4}>No transactions to display</td>
    </tr>
);

const PatientAccounting = ({ data }: { data: ITransaction[] }) => (
    <Paper shadow="md" p="md" radius="md" withBorder>
        <Title order={3}>Transactions</Title>
        <Divider my="sm" />
        <ScrollArea h={473}>
            <Table>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Amount</th>
                        <th>Method</th>
                        <th>Facture</th>
                    </tr>
                </thead>
                <tbody>{data.length === 0 ? <NoData /> : rows(data)}</tbody>
            </Table>
        </ScrollArea>
    </Paper>
);

export { PatientAccounting };
