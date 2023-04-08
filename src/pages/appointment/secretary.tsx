// import { DateInput } from '@mantine/dates';
import { Title, Grid, Select, NumberInput, Divider, TextInput } from '@mantine/core';
import { useAppFormContext } from './formContext';
import { IconCurrencyEuro } from '@tabler/icons-react';

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
        <>
            <Divider my="lg" />
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
                            defaultValue={view ? secretary.amount : 33}
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
                            defaultValue={'card'}
                            data={['cash', 'card', 'transfer']}
                            {...form.getInputProps('payment.method')}
                        />
                    )}
                </Grid.Col>
            </Grid>
        </>
    );
};

export default Secretary;
