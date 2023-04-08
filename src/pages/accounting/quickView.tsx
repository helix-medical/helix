import { Card, Title, Text, Grid, Flex } from '@mantine/core';

const QuickView = () => {
    return (
        <>
            <Title order={2}>Quick View</Title>
            <Grid columns={3} align="center" p="md">
                <Grid.Col span={1}>
                    <Text size="xl">This Month (dates)</Text>
                    <Flex justify="space-between">
                        <Card>
                            <Text size="xl">Total Card</Text>
                            <Text size="xl">$0</Text>
                        </Card>
                        <Card>
                            <Text size="xl">Total Cash</Text>
                            <Text size="xl">$0</Text>
                        </Card>
                        <Card>
                            <Text size="xl">Total Check</Text>
                            <Text size="xl">$0</Text>
                        </Card>
                    </Flex>
                </Grid.Col>
                <Grid.Col span={1}>
                    <Text size="xl">This Week (dates)</Text>
                    <Flex justify="space-between">
                        <Card>
                            <Text size="xl">Total Card</Text>
                            <Text size="xl">$0</Text>
                        </Card>
                        <Card>
                            <Text size="xl">Total Cash</Text>
                            <Text size="xl">$0</Text>
                        </Card>
                        <Card>
                            <Text size="xl">Total Check</Text>
                            <Text size="xl">$0</Text>
                        </Card>
                    </Flex>
                </Grid.Col>
                <Grid.Col span={1}>
                    <Text size="xl">All (date)</Text>
                    <Flex justify="space-between">
                        <Card>
                            <Text size="xl">Total Card</Text>
                            <Text size="xl">$0</Text>
                        </Card>
                        <Card>
                            <Text size="xl">Total Cash</Text>
                            <Text size="xl">$0</Text>
                        </Card>
                        <Card>
                            <Text size="xl">Total Check</Text>
                            <Text size="xl">$0</Text>
                        </Card>
                    </Flex>
                </Grid.Col>
            </Grid>
        </>
    );
};

export default QuickView;
