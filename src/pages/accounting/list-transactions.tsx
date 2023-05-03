import React, { useState, useEffect } from 'react';
import {
    Badge,
    Button,
    Grid,
    Group,
    Paper,
    ScrollArea,
    SegmentedControl,
    Table,
    Text,
    TextInput,
    Title,
} from '@mantine/core';
import setNotification from '../../components/errors/feedback-notification';
import IdBadge from '../../components/customBadges/id';
import { ITransactions } from '../../types/interfaces';
import PaymentMethod from '../../components/customBadges/payment-method';
import moment from 'moment';
import cnf from '../../config/config';
import { keys } from '@mantine/utils';
import Th from '../../components/th-sort';
import { IconSearch } from '@tabler/icons-react';
import ExportAccounting from './export';
import ViewFacture from './view-facture';
import useApplicationRoutes from '../../api/routes';

const filterData = (data: ITransactions[], search: string) => {
    const query = search.toLowerCase().trim();
    return data.filter((item) =>
        // eslint-disable-next-line array-callback-return
        keys(data[0]).some((key) => {
            if (typeof item[key] === 'string') return item[key].toLowerCase().includes(query);
        })
    );
};

const sortData = (
    data: ITransactions[],
    payload: { sortBy: keyof ITransactions | null; reversed: boolean; search: string }
) => {
    const { sortBy } = payload;

    if (!sortBy) {
        return filterData(data, payload.search);
    }

    return filterData(
        [...data].sort((a, b) => {
            if (payload.reversed) {
                return b[sortBy].localeCompare(a[sortBy]);
            }

            return a[sortBy].localeCompare(b[sortBy]);
        }),
        payload.search
    );
};

const ListTransactions = (): JSX.Element => {
    const routes = useApplicationRoutes();
    const [transactions, setTransactions] = useState<ITransactions[]>([]);
    const [view, setView] = useState('all');
    const [search, setSearch] = useState<string>('');
    const [sortedData, setSortedData] = useState(transactions);
    const [sortBy, setSortBy] = useState<keyof ITransactions | null>(null);
    const [reverseSortDirection, setReverseSortDirection] = useState(false);
    const [showFacture, setShowFacture] = useState(false);
    const [id, setId] = useState<string>('');

    useEffect(() => {
        setSortedData(sortData(transactions, { sortBy, reversed: reverseSortDirection, search }));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [transactions]);

    const setSorting = (field: keyof ITransactions) => {
        const reversed = field === sortBy ? !reverseSortDirection : false;
        setReverseSortDirection(reversed);
        setSortBy(field);
        setSortedData(sortData(transactions, { sortBy: field, reversed, search }));
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.currentTarget;
        setSearch(value);
        setSortedData(sortData(transactions, { sortBy, reversed: reverseSortDirection, search: value }));
    };

    useEffect(() => {
        const fetchAllTransactions = async (period: string) => {
            const now = new Date();
            let startDate: string = '1998-12-17';
            const endDate = moment(now).format(cnf.formatDateTime);
            switch (period) {
                case 'week':
                    startDate = moment(now).subtract(7, 'days').format(cnf.formatDateTime);
                    break;
                case 'month':
                    startDate = moment(now).subtract(1, 'months').format(cnf.formatDateTime);
                    break;
            }
            try {
                const res = await routes.accounting.getByDates(startDate, endDate);
                setTransactions(res.data);
            } catch (error: any) {
                if (!error?.response) setNotification(true, 'Network error');
                else if (error.response.status !== 404)
                    setNotification(true, `${error.message}: ${error.response.data.message}`);
            }
        };
        fetchAllTransactions(view);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [view]);

    const rows = sortedData.map((row) => (
        <tr key={row.uid}>
            <td>
                <IdBadge id={row.uid ?? ''} color="teal" />
            </td>
            <td>
                <Text fw={700}>€{row.amount}</Text>
            </td>
            <td>
                {row.patientName} {row.patientLastName}
            </td>

            <td>{moment(row.date).format(cnf.formatDatePretty)}</td>
            <td>
                <PaymentMethod method={row.method} />
            </td>
            <td>
                <Button
                    color="teal"
                    radius="sm"
                    variant="light"
                    onClick={() => {
                        setId(row.uid);
                        setShowFacture(true);
                    }}
                >
                    View
                </Button>
            </td>
        </tr>
    ));

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
            <ScrollArea>
                <TextInput
                    placeholder="Search a transaction"
                    mb="md"
                    icon={<IconSearch size="0.9rem" stroke={1.5} />}
                    value={search}
                    onChange={handleSearchChange}
                />
                <Table
                    horizontalSpacing="md"
                    verticalSpacing="md"
                    miw={700}
                    sx={{ tableLayout: 'fixed' }}
                    highlightOnHover
                    withColumnBorders
                >
                    <thead>
                        <tr>
                            <th>ID</th>
                            <Th
                                sorted={sortBy === 'amount'}
                                reversed={reverseSortDirection}
                                onSort={() => setSorting('amount')}
                            >
                                Amount
                            </Th>
                            <Th
                                sorted={sortBy === 'patientName'}
                                reversed={reverseSortDirection}
                                onSort={() => setSorting('patientName')}
                            >
                                Patient
                            </Th>
                            <Th
                                sorted={sortBy === 'date'}
                                reversed={reverseSortDirection}
                                onSort={() => setSorting('date')}
                            >
                                Date
                            </Th>
                            <Th
                                sorted={sortBy === 'method'}
                                reversed={reverseSortDirection}
                                onSort={() => setSorting('method')}
                            >
                                Method
                            </Th>
                            <th>Facture</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows.length > 0 ? (
                            rows
                        ) : (
                            <tr>
                                <td colSpan={6}>
                                    <Text weight={500} align="center">
                                        No Transactions found
                                    </Text>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </ScrollArea>
            {showFacture && <ViewFacture open={showFacture} handler={() => setShowFacture(false)} id={id} />}
        </Paper>
    );
};

export default ListTransactions;
