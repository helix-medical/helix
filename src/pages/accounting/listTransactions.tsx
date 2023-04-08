import axios from 'axios';
import { Table, Grid, Title, Badge, Button } from '@mantine/core';
import { useState, useEffect } from 'react';
import setNotification from '../system/errors/feedbackNotif';
import IdBadge from '../../components/id';
import { ITransactions } from '../../interfaces';
import PaymentMethod from '../../components/customBadges/paymentMethod';

const ListTransactions = (): JSX.Element => {
    const [transactions, setTransactions] = useState<ITransactions[]>([]);
    const [view, setView] = useState('all');
    useEffect(() => {
        const fetchAllTransactions = async () => {
            try {
                const res = await axios.get('/api/accounting');
                setTransactions(res.data);
            } catch (error: any) {
                if (!error?.response) setNotification(true, 'Network error');
                else setNotification(true, `${error.message}: ${error.response.data.message}`);
            }
        };
        fetchAllTransactions();
    }, []);

    return (
        <>
            <Grid justify="space-between" align="center" p="md">
                <Title order={2}>
                    All Transactions{' '}
                    <Badge size="lg" radius="lg" variant="filled">
                        {transactions.length}
                    </Badge>
                </Title>
                <Button.Group>
                    <Button
                        variant={view === 'weekly' ? 'filled' : 'outline'}
                        onClick={() => setView('weekly')}
                        px="xs"
                    >
                        Weekly
                    </Button>
                    <Button
                        variant={view === 'monthly' ? 'filled' : 'outline'}
                        onClick={() => setView('monthly')}
                        px="xs"
                    >
                        Monthly
                    </Button>
                    <Button variant={view === 'all' ? 'filled' : 'outline'} onClick={() => setView('all')}>
                        All
                    </Button>
                </Button.Group>
            </Grid>
            <Table horizontalSpacing="md" verticalSpacing="md" highlightOnHover withColumnBorders>
                <thead>
                    <tr>
                        <th>UID</th>
                        <th>Amount (€)</th>
                        <th>Patient</th>
                        <th>Method</th>
                        <th>Date</th>
                        <th>Appointment</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map((transaction) => (
                        <tr key={transaction.uid}>
                            <td>
                                <IdBadge id={transaction.uid ?? ''} />
                            </td>
                            <td>{transaction.amount}</td>
                            <td>
                                <IdBadge id={transaction.patientId} />
                            </td>
                            <td>
                                <PaymentMethod method={transaction.method} />
                            </td>
                            <td>{transaction.date}</td>
                            <td>
                                <IdBadge id={transaction.appId} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    );
};

export default ListTransactions;
