import React from 'react';
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
import { IconSearch } from '@tabler/icons-react';
import { ITransactions } from './types';
import cnf from '../../config/config';
import ExportAccounting from './export';
import { ID, PaymentMethod } from '../../components/custom-badges';
import moment from 'moment';
import Th from '../../components/th-sort';
import ViewPDF from '../../components/pdf/viewer';
import { useListView } from '../../helpers/list-view';
import { useTransactions } from './transactions.logic';

const Transactions = (): JSX.Element => {
    const { transactions, handleClick, toggleModal, view, setView, showFacture, id } = useTransactions();
    const { sortedData, search, handleSearchChange, reverseSortDirection, sortBy, setSorting } =
        useListView<ITransactions>(transactions);

    const rows = sortedData.map((row) => (
        <tr key={row.uid}>
            <td>
                <ID id={row.uid ?? ''} color="teal" />
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
                <Button color="teal" radius="sm" variant="light" onClick={() => handleClick(row.uid)}>
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
            {showFacture && <ViewPDF open={showFacture} handler={toggleModal} id={id} type="facture" />}
        </Paper>
    );
};

export { Transactions };
