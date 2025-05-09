import { Table, Text } from '@mantine/core';

const NoData = ({ span }: { span: number }) => (
  <Table.Tr>
    <Table.Td colSpan={span}>
      <Text fw={500} ta="center">
        Aucune donnée trouvée.
      </Text>
    </Table.Td>
  </Table.Tr>
);

export default NoData;
