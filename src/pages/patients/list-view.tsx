import React from 'react';
import { IconSearch } from '@tabler/icons-react';
import { IPatient } from '../../types/interfaces';
import { Table, ScrollArea, Text, TextInput, Button } from '@mantine/core';
import IdBadge from '../../components/customBadges/id';
import Th from '../../components/th-sort';
import cnf from '../../config/config';
import moment from 'moment';
import ModalViewPatient from './view';
import { useListView } from './list-view.logic';

interface TableSortProps {
    patients: IPatient[];
    handleDelete: (id: string | undefined) => void;
}

const PatientsTableView = ({ patients, handleDelete }: TableSortProps) => {
    const {
        sortedData,
        search,
        handleSearchChange,
        reverseSortDirection,
        toggleModal,
        setPatient,
        patient,
        sortBy,
        setSorting,
        show,
    } = useListView(patients);

    const rows = sortedData.map((row: any) => (
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
                <Button
                    variant="light"
                    color="fr-yellow.4"
                    onClick={() => {
                        setPatient(row);
                        toggleModal();
                    }}
                >
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
                                    No patients found
                                </Text>
                            </td>
                        </tr>
                    )}
                </tbody>
            </Table>
            {show && (
                <ModalViewPatient patient={patient} show={show} toggleModal={toggleModal} handleDelete={handleDelete} />
            )}
        </ScrollArea>
    );
};

export default PatientsTableView;
