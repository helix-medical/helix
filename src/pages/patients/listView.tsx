import { IconSearch } from '@tabler/icons-react';
import { IPatient } from '../../interfaces';
import { keys } from '@mantine/utils';
import { Table, ScrollArea, Text, TextInput, Button } from '@mantine/core';
import { useState } from 'react';
import IdBadge from '../../components/customBadges/id';
import Th from '../../components/thSort';
import cnf from '../../config/config';
import moment from 'moment';

interface TableSortProps {
    patients: IPatient[];
}

const filterData = (data: IPatient[], search: string) => {
    const query = search.toLowerCase().trim();
    return data.filter((item) => keys(data[0]).some((key) => item[key].toLowerCase().includes(query)));
};

const sortData = (data: IPatient[], payload: { sortBy: keyof IPatient | null; reversed: boolean; search: string }) => {
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

const PatientsTableView = ({ patients }: TableSortProps) => {
    const [search, setSearch] = useState<string>('');
    const [sortedData, setSortedData] = useState(patients);
    const [sortBy, setSortBy] = useState<keyof IPatient | null>(null);
    const [reverseSortDirection, setReverseSortDirection] = useState(false);

    const setSorting = (field: keyof IPatient) => {
        const reversed = field === sortBy ? !reverseSortDirection : false;
        setReverseSortDirection(reversed);
        setSortBy(field);
        setSortedData(sortData(patients, { sortBy: field, reversed, search }));
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.currentTarget;
        setSearch(value);
        setSortedData(sortData(patients, { sortBy, reversed: reverseSortDirection, search: value }));
    };

    const rows = sortedData.map((row) => (
        <tr key={row.id}>
            <td>
                <IdBadge id={row.id ?? ''} />
            </td>
            <td>{row.name}</td>
            <td>{row.lastName}</td>
            <td>{moment(row.birthDate).format(cnf.formatDatePretty)}</td>
            <td>{row.email}</td>
            <td>{row.city}</td>
            <td>
                <Button variant="light">NOT IMPLEMENTED</Button>
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
                        <Th
                            sorted={sortBy === 'city'}
                            reversed={reverseSortDirection}
                            onSort={() => setSorting('city')}
                        >
                            City
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
                                    Not patients found
                                </Text>
                            </td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </ScrollArea>
    );
};

export default PatientsTableView;
