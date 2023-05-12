import React from 'react';
import { IconSearch } from '@tabler/icons-react';
import { IPatientListView } from './types';
import { Table, ScrollArea, Text, TextInput, Button } from '@mantine/core';
import { useListView } from '../../helpers/list-view.logic';
import cnf from '../../config/config';
import IdBadge from '../../components/customBadges/id';
import moment from 'moment';
import Th from '../../components/th-sort';

const PatientsTableView = ({ patients }: { patients: IPatientListView[] }) => {
    const { sortedData, search, handleSearchChange, reverseSortDirection, sortBy, setSorting, navigate } =
        useListView<IPatientListView>(patients);
    const navigateToPatient = (id: string) => navigate(`/patients/${id}`);

    const rows = sortedData.map((row: any) => (
        <tr key={row.id}>
            <td>
                <IdBadge id={row.id ?? ''} />
            </td>
            <td>{row.name}</td>
            <td>{row.lastName}</td>
            <td>{moment(row.birthDate).format(cnf.formatDatePretty)}</td>
            <td>{row.email}</td>
            <td>
                <Button variant="light" color="fr-yellow.4" onClick={() => navigateToPatient(row.id)}>
                    View
                </Button>
            </td>
        </tr>
    ));

    return (
        <ScrollArea>
            <TextInput
                placeholder="Search a patient"
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
                            sorted={sortBy === 'birthDate'}
                            reversed={reverseSortDirection}
                            onSort={() => setSorting('birthDate')}
                        >
                            Birth Date
                        </Th>
                        <Th
                            sorted={sortBy === 'email'}
                            reversed={reverseSortDirection}
                            onSort={() => setSorting('email')}
                        >
                            Email
                        </Th>
                        <th>View</th>
                    </tr>
                </thead>
                <tbody>
                    {rows.length > 0 ? (
                        rows
                    ) : (
                        <tr>
                            <td colSpan={7}>
                                <Text weight={500} align="center">
                                    No patients found
                                </Text>
                            </td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </ScrollArea>
    );
};

export { PatientsTableView };
