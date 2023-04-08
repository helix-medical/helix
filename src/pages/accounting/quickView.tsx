import { Card, Title, Text, Grid, Flex } from '@mantine/core';

const QuickView = () => {
    return (
        <>
            <Title order={2}>Quick View</Title>
            <Grid justify="space-between" align="center" p="md">
                <Card>
                    <Text size="xl">Total Month (dates)</Text>
                    <Flex>
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
                </Card>

                <Card>
                    <Text size="xl">This Week (dates)</Text>
                    <Flex>
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
                </Card>
            </Grid>
        </>
    );
};

export default QuickView;
