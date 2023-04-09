// import { DateInput } from '@mantine/dates';
import { Title, Grid, Select, NumberInput, TextInput, Paper } from '@mantine/core';
import { useAppFormContext } from './formContext';
import { IconCurrencyEuro } from '@tabler/icons-react';
import cnf from '../../config/config';

interface IProps {
    view?: boolean;
    secretary: {
        amount: number;
        method: string;
    };
}

const Secretary = ({ secretary, view }: IProps): JSX.Element => {
    const form = useAppFormContext();

    return (
        <Paper shadow="sm" radius="md" p="lg" withBorder my="lg">
            <Title order={2}>Secretary Part</Title>
            <Grid columns={12}>
                <Grid.Col span={6}>
                    {view ? (
                        <TextInput
                            icon={<IconCurrencyEuro size="1rem" />}
                            label="Amount"
                            defaultValue={secretary.amount}
                            readOnly
                        />
                    ) : (
                        <NumberInput
                            icon={<IconCurrencyEuro size="1rem" />}
                            label="Amount"
                            defaultValue={view ? secretary.amount : cnf.defaultAmount}
                            {...(view ? null : form.getInputProps('payment.amount'))}
                            readOnly={view}
                        />
                    )}
                </Grid.Col>
                <Grid.Col span={6}>
                    {view ? (
                        <TextInput label="Method" defaultValue={secretary.method} readOnly />
                    ) : (
                        <Select
                            label="Method"
                            defaultValue={cnf.defaultPaymentMethod}
                            data={['cash', 'card', 'transfer']}
                            {...form.getInputProps('payment.method')}
                        />
                    )}
                </Grid.Col>
            </Grid>
        </Paper>
    );
};

export default Secretary;
