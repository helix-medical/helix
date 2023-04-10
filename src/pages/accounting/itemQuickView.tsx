import { Paper, Text, ThemeIcon, Group, Grid } from '@mantine/core';
import { IconCoins, IconCreditCard, IconFileHorizontal } from '@tabler/icons-react';

interface IProps {
    sum: {
        sum: number;
        checks: number;
        cashs: number;
        cards: number;
    };
    name: string;
}

const ItemQuickView = ({ sum, name }: IProps) => {
    return (
        <Paper shadow="sm" radius="md" p="lg" withBorder>
            <Text c="dimmed" tt="uppercase" fw={700} fz="xs">
                {name}
            </Text>
            <Text fz="xl" fw={700}>
                Total:{' '}
                <Text span fz="xl" fw={700} color="teal.6">
                    €{sum?.sum}
                </Text>
            </Text>
            <Grid columns={3} mt="xs">
                <Grid.Col span={1}>
                    <Group position="center">
                        <ThemeIcon radius="md" size="lg" color={sum?.cards > 0 ? 'teal' : 'gray'} variant="outline">
                            <IconCreditCard />
                        </ThemeIcon>
                        <Text fz="lg" fw={700}>
                            €{sum?.cards}
                        </Text>
                    </Group>
                </Grid.Col>
                <Grid.Col span={1}>
                    <Group position="center">
                        <ThemeIcon radius="md" size="lg" color={sum?.cashs > 0 ? 'teal' : 'gray'} variant="outline">
                            <IconCoins />
                        </ThemeIcon>
                        <Text fz="lg" fw={700}>
                            €{sum?.cashs}
                        </Text>
                    </Group>
                </Grid.Col>
                <Grid.Col span={1}>
                    <Group position="center">
                        <ThemeIcon radius="md" size="lg" color={sum?.checks > 0 ? 'teal' : 'gray'} variant="outline">
                            <IconFileHorizontal />
                        </ThemeIcon>
                        <Text fz="lg" fw={700}>
                            €{sum?.checks}
                        </Text>
                    </Group>
                </Grid.Col>
            </Grid>
        </Paper>
    );
};

export default ItemQuickView;
