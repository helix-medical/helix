import React from 'react';
import { IAppointmentExtended } from '../../types/interfaces';
import { IconSearch } from '@tabler/icons-react';
import { Table, ScrollArea, Text, TextInput, Button } from '@mantine/core';
import { useListView } from '../../helpers/list-view.logic';
import cnf from '../../config/config';
import { ID, KindAppointment } from '../../components/custom-badges';
import moment from 'moment';
import Th from '../../components/th-sort';

const AppTableView = ({ appointments }: { appointments: IAppointmentExtended[] }): JSX.Element => {
    const { sortedData, search, handleSearchChange, reverseSortDirection, sortBy, setSorting, navigate } =
        useListView<IAppointmentExtended>(appointments);

    const rows = sortedData.map((row) => (
        <tr key={row.id}>
            <td>
                <ID id={row.id ?? ''} />
            </td>
            <td>{row.name}</td>
            <td>{row.lastName}</td>
            <td>{moment(row.date).format(cnf.formatDateTimePretty)}</td>
            <td>
                <KindAppointment kind={row.kind} />
            </td>
            <td>
                <Button
                    variant="light"
                    color="fr-orange.4"
                    p={row.status !== 'pending' ? 'xs' : 'sm'}
                    onClick={() => navigate(`/appointments/${row.id}`)}
                >
                    {row.status !== 'pending' ? 'View' : 'Edit'}
                </Button>
            </td>
        </tr>
    ));

    return (
        <ScrollArea>
            <TextInput
                placeholder="Search an appointment"
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
                            sorted={sortBy === 'name'}
                            reversed={reverseSortDirection}
                            onSort={() => setSorting('name')}
                        >
                            Name
                        </Th>
                        <Th
                            sorted={sortBy === 'lastName'}
                            reversed={reverseSortDirection}
                            onSort={() => setSorting('lastName')}
                        >
                            Last Name
                        </Th>
                        <Th
                            sorted={sortBy === 'date'}
                            reversed={reverseSortDirection}
                            onSort={() => setSorting('date')}
                        >
                            Date
                        </Th>
                        <Th
                            sorted={sortBy === 'kind'}
                            reversed={reverseSortDirection}
                            onSort={() => setSorting('kind')}
                        >
                            Kind
                        </Th>
                        <th>View</th>
                    </tr>
                </thead>
                <tbody>
                    {rows.length > 0 ? (
                        rows
                    ) : (
                        <tr>
                            <td colSpan={6}>
                                <Text weight={500} align="center">
                                    No appointments found
                                </Text>
                            </td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </ScrollArea>
    );
};

export default AppTableView;
