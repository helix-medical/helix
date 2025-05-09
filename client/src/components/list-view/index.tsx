import { useState } from 'react';
import { RowData } from './types';
import { sortData } from './helpers';
import { ScrollArea, Table, TextInput } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import { TableHeader } from './headers';
import { CreateRows } from './rows';
import NoData from '../table-no-data';

/**
 * Component to display a table with sorting and searching capabilities.
 *
 * @param data the data to display in the table
 * @param type the type of the data. Can be 'patients', 'appointments', 'users' and 'accounting'
 * @param callbacks the callbacks to execute when the user clicks on a row
 * @constructor
 */
const HelixTableSort = ({
  data,
  type,
  callbacks,
}: {
  data: any;
  type: string;
  callbacks: ((id: string) => void)[];
}) => {
  const [search, setSearch] = useState('');
  const [sortedData, setSortedData] = useState(data);
  const [sortBy, setSortBy] = useState<keyof RowData | null>(null);
  const [reverseSortDirection, setReverseSortDirection] = useState(false);

  const setSorting = (field: keyof RowData) => {
    const reversed = field === sortBy ? !reverseSortDirection : false;
    setReverseSortDirection(reversed);
    setSortBy(field);
    setSortedData(sortData(data, { sortBy: field, reversed, search }));
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    setSearch(value);
    setSortedData(sortData(data, { sortBy, reversed: reverseSortDirection, search: value }));
  };

  return (
    <>
      <TextInput
        placeholder="Rechercher dans tous les champs"
        mb="md"
        leftSection={<IconSearch size={16} stroke={1.5} />}
        value={search}
        onChange={handleSearchChange}
      />
      <ScrollArea>
        <Table
          horizontalSpacing="md"
          verticalSpacing="xs"
          miw={700}
          layout="fixed"
          highlightOnHover
          withColumnBorders
          stickyHeader
        >
          <Table.Thead>
            <Table.Tr>
              <Table.Th>ID</Table.Th>
              <TableHeader type={type} callback={setSorting} sortBy={sortBy} reversed={reverseSortDirection} />
              <Table.Th>Actions</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {data.length > 0 ? (
              sortedData.map((item: any) => <CreateRows type={type} item={item} callbacks={callbacks} />)
            ) : (
              <NoData span={6} />
            )}
          </Table.Tbody>
        </Table>
      </ScrollArea>
    </>
  );
};

export default HelixTableSort;
