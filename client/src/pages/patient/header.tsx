import { ActionIcon, Avatar, Grid, Group, Title, Tooltip } from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';
import GrantAccess from '../../components/auth/grant-access';
import { usePatientNavBar } from './navbar.logic';
import { IPatient } from './types';
import { usePatientContext } from './context';
import { useEffect } from 'react';
import ViewPDF from '../../components/pdf/viewer';
import { Sex } from '../../components/custom-badges';
import { IconCheck, IconDownload, IconEdit, IconPhone, IconSend, IconTrash } from '@tabler/icons-react';

const PatientNavBar = ({ form }: { form: UseFormReturnType<IPatient> }) => {
  const { handleDelete, handleUpdate, update, showExport, handleExport } = usePatientNavBar(form);
  const { setUpdate } = usePatientContext();
  useEffect(() => {
    setUpdate(update);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [update]);
  return (
    <>
      <Grid.Col span={8}>
        <Group align="left">
          <Avatar
            size="lg"
            radius="lg"
            color="fr-yellow.3"
          >{`${form.values.name[0]}${form.values.lastName[0]}`}</Avatar>
          <Title order={1}>
            {form.values.name} {form.values.lastName}
          </Title>
          <Sex sex={form.values.sex} />
        </Group>
      </Grid.Col>
      <Grid.Col span={4}>
        <Group align="apart">
          <>
            <Tooltip label="Appeler" withArrow color="yellow">
              <ActionIcon variant="light" color="fr-yellow.3" size="xl">
                <IconPhone size="1.5rem" />
              </ActionIcon>
            </Tooltip>
            <Tooltip label="Envoyer un mail" withArrow color="yellow">
              <ActionIcon variant="light" color="fr-yellow.3" size="xl">
                <IconSend size="1.5rem" />
              </ActionIcon>
            </Tooltip>
          </>
          <GrantAccess levels={['ADMIN', 'PRACTITIONER']}>
            <Tooltip label={update ? 'Enregistrer' : 'Modifier'} withArrow color="green">
              <ActionIcon variant="light" color="green" size="xl" onClick={(event) => handleUpdate(event)}>
                {update ? <IconCheck size="1.5rem" /> : <IconEdit size="1.5rem" />}
              </ActionIcon>
            </Tooltip>
            <Tooltip label="Exporter le dossier" withArrow color="blue">
              <ActionIcon variant="light" color="blue" size="xl" onClick={handleExport}>
                <IconDownload size="1.5rem" />
              </ActionIcon>
            </Tooltip>
            <Tooltip label="Supprimer" withArrow color="red">
              <ActionIcon variant="light" color="red" size="xl" onClick={() => handleDelete(form.values.id)}>
                <IconTrash size="1.5rem" />
              </ActionIcon>
            </Tooltip>
          </GrantAccess>
        </Group>
      </Grid.Col>
      {showExport ? <ViewPDF open={showExport} id={form.values.id} type="patient" handler={handleExport} /> : null}
    </>
  );
};

export { PatientNavBar };
