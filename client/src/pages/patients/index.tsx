import { useEffect, useState } from 'react';
import { Badge, Button, Grid, Group, Paper, Title, useMantineColorScheme } from '@mantine/core';
import { ModalAddPatient } from './create';
// import { PatientsStyles } from './patients.styles';
import { usePatients } from './patients.logic';
import HelixTableSort from '../../components/list-view';
import { useNavigate } from 'react-router-dom';

const Patients = ({ add }: { add: boolean }): JSX.Element => {
  const [mainColor, setMainColor] = useState('fr-yellow.4');
  const { colorScheme } = useMantineColorScheme();
  // const { classes } = PatientsStyles();
  const { patients, error, changeView, isGrid, show, nbPatients, toggleModal } = usePatients(add);
  const navigate = useNavigate();
  const handleRowClick = (id: string) => {
    navigate(`/patients/${id}`);
  };

  useEffect(() => {
    setMainColor(colorScheme === 'dark' ? 'fr-yellow.6' : 'fr-yellow.4');
  }, [colorScheme]);

  return (
    <>
      <Grid justify="space-between" align="center" p="md">
        <Group align="left">
          <Title order={1}>
            Patients{' '}
            <Badge size="xl" radius="lg" variant="filled" color={mainColor}>
              {nbPatients}
            </Badge>
          </Title>
        </Group>
        <Group align="right">
          {/*<Tooltip label={isGrid ? 'Table' : 'Grid'} withArrow position="bottom" color={mainColor}>*/}
          {/*  <ActionIcon*/}
          {/*    color={mainColor}*/}
          {/*    variant="outline"*/}
          {/*    size="lg"*/}
          {/*    onClick={changeView}*/}
          {/*    // className={classes.button}*/}
          {/*  >*/}
          {/*    {isGrid ? <IconLayoutList /> : <IconLayoutGrid />}*/}
          {/*  </ActionIcon>*/}
          {/*</Tooltip>*/}
          <Button onClick={toggleModal} color={mainColor}>
            Ajouter un patient
          </Button>
        </Group>
      </Grid>
      {/*{error ? (*/}
      {/*  <NoContent message={error} title="Error while getting Patients" />*/}
      {/*) : nbPatients === 0 ? (*/}
      {/*  <LoadingOverlay visible={true} />*/}
      {/*) : (*/}
      <Paper shadow="sm" radius="md" p="lg" withBorder my="lg">
        {/*{isGrid ? (*/}
        {/*  <Grid columns={12} gutter={{ xs: 6, sm: 4, md: 3, lg: 3, xl: 2 }}>*/}
        {/*    {patients.map((patient: IPatientGridView) => (*/}
        {/*      <Grid.Col key={patient.id} span={3}>*/}
        {/*        <PatientItemGrid patient={patient} />*/}
        {/*      </Grid.Col>*/}
        {/*    ))}*/}
        {/*  </Grid>*/}
        {/*) : (*/}
        <HelixTableSort data={patients} type="patients" callbacks={[handleRowClick]} />
        {/*)}*/}
      </Paper>
      {/*)}*/}
      <ModalAddPatient show={show} toggleModal={toggleModal} />
    </>
  );
};

export default Patients;
