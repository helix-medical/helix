import { Button, Grid, NumberInput, Paper, Select, TextInput, Title } from '@mantine/core';
import { useAppFormContext } from './form-context';
import { IconCurrencyEuro } from '@tabler/icons-react';
import cnf from '../../config/config';
import { DateTimePicker } from '@mantine/dates';

interface IProps {
  view: boolean;
}

const Secretary = ({ view }: IProps): JSX.Element => {
  const form = useAppFormContext();

  return (
    <Paper shadow="sm" radius="md" p="lg" withBorder my="lg">
      <Title order={2}>Secretary Part</Title>
      <Grid columns={12}>
        <Grid.Col span={4}>
          {/* {view ? (
                        <TextInput
                            icon={<IconCurrencyEuro size="1rem" />}
                            label="Amount"
                            defaultValue={secretary.amount}
                            readOnly
                        />
                    ) : ( */}
          <NumberInput
            leftSection={<IconCurrencyEuro size="1rem" />}
            label="Amount"
            placeholder="Amount"
            {...form.getInputProps('payment.amount')}
            readOnly={view}
          />
          {/* )} */}
        </Grid.Col>
        <Grid.Col span={4}>
          {view ? (
            <TextInput label="Method" defaultValue={form.values.payment.method} readOnly />
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
          <DateTimePicker
            label="Next Appointment"
            placeholder="Date"
            // onPointerEnterCapture={undefined}
            // onPointerLeaveCapture={undefined}
          />
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

export { Secretary };
