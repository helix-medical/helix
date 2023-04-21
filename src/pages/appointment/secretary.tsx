import React from 'react';
import { Title, Grid, Select, NumberInput, TextInput, Paper, Button } from '@mantine/core';
import { useAppFormContext } from './form-context';
import { IconCurrencyEuro } from '@tabler/icons-react';
import cnf from '../../config/config';
import { DateTimePicker } from '@mantine/dates';

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
                <Grid.Col span={4}>
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
                <Grid.Col span={4}>
                    {view ? (
                        <TextInput label="Method" defaultValue={secretary.method} readOnly />
                    ) : (
                        <Select
                            label="Method"
                            placeholder="Choose..."
                            defaultValue={cnf.defaultPaymentMethod}
                            data={['cash', 'card', 'check']}
                            {...form.getInputProps('payment.method')}
                        />
                    )}
                </Grid.Col>
                <Grid.Col span={4}>
                    <Button fullWidth variant="light" color="fr-orange.4" mt="xl">
                        Facture
                    </Button>
                </Grid.Col>
                <Grid.Col span={6}>
                    <DateTimePicker label="Next Appointment" placeholder="Date" />
                </Grid.Col>
                <Grid.Col span={6}>
                    <Button fullWidth variant="light" color="fr-orange.4" mt="xl">
                        Add Appointment
                    </Button>
                </Grid.Col>
            </Grid>
        </Paper>
    );
};

export default Secretary;
