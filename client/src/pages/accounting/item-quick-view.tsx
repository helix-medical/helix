import { Flex, Group, Paper, Text, ThemeIcon } from '@mantine/core';
import { IconCoins, IconCreditCard, IconFileHorizontal } from '@tabler/icons-react';
import { ISum } from './types';

const ItemQuickView = ({ sum, name }: { sum: ISum; name: string }) => (
  <Paper shadow="sm" radius="md" p="lg" withBorder>
    <Text c="dimmed" tt="uppercase" fw={700} fz="xs">
      This {name}
    </Text>
    <Text fz="xl" fw={700}>
      Total:{' '}
      <Text span fz="xl" fw={700} color="teal.6">
        €{sum?.sum ?? 0}
      </Text>
    </Text>
    <Flex direction="row" align="center" justify="space-around">
      <Group align="center">
        <ThemeIcon radius="md" size="lg" color={sum?.cards > 0 ? 'teal' : 'gray'} variant="outline">
          <IconCreditCard />
        </ThemeIcon>
        <Text fz="lg" fw={700}>
          €{sum?.cards ?? 0}
        </Text>
      </Group>
      <Group align="center">
        <ThemeIcon radius="md" size="lg" color={sum?.cashs > 0 ? 'teal' : 'gray'} variant="outline">
          <IconCoins />
        </ThemeIcon>
        <Text fz="lg" fw={700}>
          €{sum?.cashs ?? 0}
        </Text>
      </Group>
      <Group align="center">
        <ThemeIcon radius="md" size="lg" color={sum?.checks > 0 ? 'teal' : 'gray'} variant="outline">
          <IconFileHorizontal />
        </ThemeIcon>
        <Text fz="lg" fw={700}>
          €{sum?.checks ?? 0}
        </Text>
      </Group>
    </Flex>
  </Paper>
);

export { ItemQuickView };
