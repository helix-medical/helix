import axios from 'axios';
import { Table, Grid, Title, Badge, Paper, SegmentedControl, Button, Text } from '@mantine/core';
import { useState, useEffect } from 'react';
import setNotification from '../system/errors/feedbackNotif';
import IdBadge from '../../components/customBadges/id';
import { ITransactions } from '../../interfaces';
import PaymentMethod from '../../components/customBadges/paymentMethod';
import moment from 'moment';
import cnf from '../../config/config';
import { useNavigate } from 'react-router-dom';

const ListTransactions = (): JSX.Element => {
    const [transactions, setTransactions] = useState<ITransactions[]>([]);
    const [view, setView] = useState('all');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAllTransactions = async (period: string) => {
            const now = new Date();
            let startDate: string = '1998-12-17';
            const endDate = moment(now).format('YYYY-MM-DD');
            switch (period) {
                case 'week':
                    startDate = moment(now).subtract(7, 'days').format('YYYY-MM-DD');
                    break;
                case 'month':
                    startDate = moment(now).subtract(1, 'months').format('YYYY-MM-DD');
                    break;
            }
            try {
                const res = await axios.get(`/api/accounting/${startDate}/${endDate}`);
                setTransactions(res.data);
            } catch (error: any) {
                if (!error?.response) setNotification(true, 'Network error');
                else setNotification(true, `${error.message}: ${error.response.data.message}`);
            }
        };
        fetchAllTransactions(view);
    }, [view]);

    return (
        <Paper shadow="sm" radius="md" p="lg" withBorder my="lg">
            <Grid justify="space-between" align="center" p="md">
                <Title order={2}>
                    All Transactions{' '}
                    <Badge size="lg" radius="lg" variant="filled" color="teal">
                        {transactions.length}
                    </Badge>
                </Title>
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
            </Grid>
            <Table horizontalSpacing="md" verticalSpacing="md" highlightOnHover withColumnBorders>
                <thead>
                    <tr>
                        <th>UID</th>
                        <th>Amount</th>
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
                            <td>
                                <Text fw={700}>€{transaction.amount}</Text>
                            </td>
                            <td>
                                {transaction.patientName} {transaction.patientLastName}
                            </td>
                            <td>
                                <PaymentMethod method={transaction.method} />
                            </td>
                            <td>{moment(transaction.date).format(cnf.formatDatePretty)}</td>
                            <td>
                                <Button
                                    color="teal"
                                    variant="light"
                                    onClick={() => navigate(`/appointments/${transaction.appointment}/view`)}
                                >
                                    View
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Paper>
    );
};

export default ListTransactions;
