import { Button, Divider, Paper, ScrollArea, Table, Title, Text } from '@mantine/core';
import { ITransaction } from './types';
import { usePatientAccounting } from './accounting.logic';
import moment from 'moment';
import PaymentMethod from '../../components/customBadges/payment-method';
import ViewFacture from '../../components/view-facture';

const rows = (data: ITransaction[], handler: (id: string) => any) =>
    data.map((transaction) => (
        <tr key={transaction.id}>
            <td>{moment(transaction.date).format('dddd DD MMMM YYYY')}</td>
            <td>
                <Text fw={700}>€{transaction.amount}</Text>
            </td>
            <td>
                <PaymentMethod method={transaction.method} />
            </td>
            <td>
                <Button variant="light" color="teal" onClick={() => handler(transaction.id)}>
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

const PatientAccounting = ({ data }: { data: ITransaction[] }) => {
    const { selected, handleShowFacture, showFacture, handleHideFacture } = usePatientAccounting();
    return (
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
                    <tbody>{data.length === 0 ? <NoData /> : rows(data, handleShowFacture)}</tbody>
                </Table>
            </ScrollArea>
            {showFacture ? <ViewFacture open={showFacture} handler={handleHideFacture} id={selected} /> : null}
        </Paper>
    );
};

export { PatientAccounting };
