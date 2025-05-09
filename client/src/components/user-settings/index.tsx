import { Button, Grid, Modal, Text, TextInput, useMantineColorScheme, useMantineTheme } from '@mantine/core';

const ModalUserSettings = () => {
  const { colorScheme } = useMantineColorScheme();
  const theme = useMantineTheme();

  return (
    <Modal.Root opened={false} onClose={() => {}}>
      <Modal.Overlay
        color={colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2]}
        opacity={0.55}
        blur={3}
      />
      <Modal.Content>
        <Modal.Header>
          <Modal.Title>
            <Text size="xl" fw={700}>
              User Settings
            </Text>
          </Modal.Title>
          <Modal.CloseButton />
        </Modal.Header>
        <Modal.Body>
          <form>
            <Grid columns={12}>
              <Grid.Col span={6}>
                <TextInput placeholder="Name" label="Prénom" withAsterisk />
              </Grid.Col>
              <Grid.Col span={6}>
                <TextInput placeholder="Last Name" label="Nom de Famille" withAsterisk />
              </Grid.Col>
              <Grid.Col span={8}>
                <TextInput placeholder="Name" label="Email" withAsterisk />
              </Grid.Col>
              <Grid.Col span={4}>
                <TextInput placeholder="Last Name" label="Téléphone" withAsterisk />
              </Grid.Col>
              <Grid.Col span={12}>
                <Button variant="light" color="blue" fullWidth mt="md" radius="md">
                  Change Password
                </Button>
              </Grid.Col>
              <Grid.Col span={6}>
                <TextInput placeholder="Name" label="SIRET" withAsterisk />
              </Grid.Col>
            </Grid>
          </form>
        </Modal.Body>
      </Modal.Content>
    </Modal.Root>
  );
};

export default ModalUserSettings;
