import React, { useEffect, useState } from 'react';
import { Card, Grid, Progress, RingProgress, Text } from '@mantine/core';
import setNotification from '../../components/errors/feedback-notification';
import moment from 'moment';
import cnf from '../../config/config';
import useApplicationRoutes from '../../api/routes';

interface IProps {
    period: string;
}

const AccountingTile = ({ period }: IProps) => {
    const routes = useApplicationRoutes();
    const [data, setData] = useState<any>({});
    const [sum, setSum] = useState<number>(0);
    const now = moment().format(cnf.formatDateTime);
    const lastMonth = moment().subtract(1, 'months').format(cnf.formatDateTime);
    const lastWeek = moment().subtract(7, 'days').format(cnf.formatDateTime);

    const max =
        period === 'month'
            ? 4 * cnf.nbWorkDays * cnf.nbWorkHours * cnf.defaultAmount
            : cnf.nbWorkDays * cnf.nbWorkHours * cnf.defaultAmount;

    useEffect(() => {
        const getSum = async () => {
            try {
                const res = await routes.accounting.getSumByDates(period === 'month' ? lastMonth : lastWeek, now);
                setData(res.data);
                setSum((res.data.sum * 100) / max);
            } catch (error: any) {
                if (error.response.status !== 404)
                    setNotification(true, `${error.message}: ${error.response.data.message}`);
            }
        };
        getSum();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [period]);

    return (
        <Card p="lg" radius="md" withBorder mb="sm">
            <Grid columns={3}>
                <Grid.Col span={1}>
                    <RingProgress
                        sections={[{ value: sum, color: 'teal' }]}
                        label={
                            <Text size="xl" weight={700} align="center" color="teal">
                                {Math.ceil(sum)}%
                            </Text>
                        }
                    />
                </Grid.Col>
                <Grid.Col span={2}>
                    <Text fz="md" fw={700} tt="uppercase" c="dimmed">
                        {period === 'month' ? 'This month' : 'This week'}
                    </Text>
                    <Text fz="xl" fw={700} color="teal.6">
                        €{data?.sum}
                    </Text>
                    <Progress
                        style={{
                            display: data?.sum === 0 ? 'none' : 'block',
                        }}
                        mt="xl"
                        size={24}
                        radius="md"
                        sections={[
                            {
                                value: (data.cards * 100) / data.sum,
                                color: 'cyan',
                                label: 'Cards',
                                tooltip: `Cards -- ${data.cards}€`,
                            },
                            {
                                value: (data.cashs * 100) / data.sum,
                                color: 'green',
                                label: 'Cash',
                                tooltip: `Cash -- ${data.cashs}€`,
                            },
                            {
                                value: (data.checks * 100) / data.sum,
                                color: 'yellow',
                                label: 'Checks',
                                tooltip: `Checks -- ${data.checks}€`,
                            },
                        ]}
                    />
                </Grid.Col>
            </Grid>
        </Card>
    );
};

export default AccountingTile;
