import { ThProps } from './types.ts';
import { IconChevronDown, IconChevronUp, IconSelector } from '@tabler/icons-react';
import { Center, Group, Table, Text, UnstyledButton } from '@mantine/core';
import classes from './styles.module.css';

const Th = ({ children, reversed, sorted, onSort }: ThProps) => {
  const Icon = sorted ? (reversed ? IconChevronUp : IconChevronDown) : IconSelector;
  return (
    <Table.Th className={classes.th}>
      <UnstyledButton onClick={onSort} className={classes.control}>
        <Group justify="space-between">
          <Text fw={500} fz="sm">
            {children}
          </Text>
          <Center className={classes.icon}>
            <Icon size={16} stroke={1.5} />
          </Center>
        </Group>
      </UnstyledButton>
    </Table.Th>
  );
};

export { Th };
