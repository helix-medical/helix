import { Grid, TextInput, Button, Textarea, Paper, Title, Divider } from '@mantine/core';
import { IconPhone, IconSend } from '@tabler/icons-react';
import GrantAccess from '../../components/auth/grant-access';
import { UseFormReturnType } from '@mantine/form';

const Biodatas = ({ form, update }: { form: UseFormReturnType<any>; update: boolean }) => (
    <Paper shadow="md" p="md" radius="md" withBorder>
        <Title order={3}>Biodatas</Title>
        <Divider my="sm" />
        <Grid columns={12}>
            <Grid.Col span={6}>
                <TextInput
                    label="Name"
                    placeholder="Name"
                    {...form.getInputProps('name')}
                    readOnly={!update}
                    withAsterisk={update}
                />
            </Grid.Col>
            <Grid.Col span={6}>
                <TextInput
                    label="Last Name"
                    placeholder="Last Name"
                    {...form.getInputProps('lastName')}
                    readOnly={!update}
                    withAsterisk={update}
                />
            </Grid.Col>
            <Grid.Col span={6}>
                <TextInput
                    label="Birth Date"
                    placeholder="Birth Date"
                    {...form.getInputProps('birthDate')}
                    readOnly={!update}
                    withAsterisk={update}
                />
            </Grid.Col>
            <Grid.Col span={6}>
                <TextInput
                    label="Sex"
                    placeholder="Sex"
                    {...form.getInputProps('sex')}
                    readOnly={!update}
                    withAsterisk={update}
                />
            </Grid.Col>
            <Grid.Col span={12}>
                <TextInput
                    label="Address"
                    placeholder="Address"
                    {...form.getInputProps('address')}
                    readOnly={!update}
                    withAsterisk={update}
                />
            </Grid.Col>
            <Grid.Col span={6}>
                <TextInput
                    label="City"
                    placeholder="City"
                    {...form.getInputProps('city')}
                    readOnly={!update}
                    withAsterisk={update}
                />
            </Grid.Col>
            <Grid.Col span={6}>
                <TextInput
                    label="Phone"
                    placeholder="Phone"
                    {...form.getInputProps('phone')}
                    readOnly={!update}
                    withAsterisk={update}
                    rightSection={
                        <Button
                            component="a"
                            href={`tel:${form.values.phone}`}
                            color="fr-yellow.3"
                            m="xs"
                            p="xs"
                            variant="subtle"
                        >
                            <IconPhone size="1rem" />
                        </Button>
                    }
                />
            </Grid.Col>
            <Grid.Col span={6}>
                <TextInput
                    label="Médecin traitant"
                    placeholder="Médecin traitant"
                    defaultValue={form.values.doctor}
                    readOnly
                />
            </Grid.Col>
            <Grid.Col span={6}>
                <TextInput
                    label="Email"
                    placeholder="Email"
                    {...form.getInputProps('email')}
                    readOnly={!update}
                    withAsterisk={update}
                    rightSection={
                        <Button
                            component="a"
                            href={`mailto:${form.values.email}`}
                            color="fr-yellow.3"
                            m="xs"
                            p="xs"
                            variant="subtle"
                        >
                            <IconSend size="1rem" />
                        </Button>
                    }
                />
            </Grid.Col>
            <GrantAccess levels={['ADMIN', 'PRACTITIONER']}>
                <Grid.Col span={12}>
                    <Textarea
                        label="Antécédents médicaux"
                        maxRows={4}
                        placeholder="Antécédents"
                        {...form.getInputProps('medicalIssues')}
                        readOnly={!update}
                    />
                </Grid.Col>
            </GrantAccess>
        </Grid>
    </Paper>
);

export { Biodatas };
