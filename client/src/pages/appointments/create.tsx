import { useEffect, useState } from 'react';
import { Button, Grid, Group, Modal, Select, Text, useMantineColorScheme, useMantineTheme } from '@mantine/core';
import { DateTimePicker } from '@mantine/dates';
import { isNotEmpty, useForm } from '@mantine/form';
import setNotification from '../../components/errors/feedback-notification';
import cnf from '../../config/config';
import moment from 'moment';
import useApplicationRoutes from '../../api/routes';

interface IProps {
  show: boolean;
  toggleModal: () => void;
}

const ModalCreateApp = ({ show, toggleModal }: IProps): JSX.Element => {
  const routes = useApplicationRoutes();
  const handleClose = () => {
    form.reset();
    toggleModal();
  };
  const { colorScheme } = useMantineColorScheme();
  const theme = useMantineTheme();
  const [patients, setPatients] = useState([]);
  const [practitioners, setPractitioners] = useState([]);

  const handleClick = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (form.validate().hasErrors) return;
    const patient = patients.find((patient: any) => patient.value === form.values.patientId) as any;
    const event = {
      title: `${patient?.label}`,
      start: moment(form.values.date).format(cnf.formatDateTime),
      end: moment(form.values.date).add(cnf.durationAppointment, 'minutes').format(cnf.formatDateTime),
      calendar: form.values.practitioner,
    };
    try {
      const index = await routes.events.create(event);
      setNotification(false, index.data.message);
      let res = await routes.appointments.create({
        patientId: form.values.patientId,
        kind: form.values.kind,
        event: index.data.id,
      });
      setNotification(false, res.data.message);
      res = await routes.events.addAppointment(index.data.id, {
        appId: res.data.id,
        patientId: form.values.patientId,
      });
      setNotification(false, res.data.message);
      handleClose();
    } catch (error: any) {
      if (!error?.response) setNotification(true, 'Network error');
      else setNotification(true, `${error.message}: ${error.response.data.message}`);
    }
  };

  const getPatients = async () => {
    try {
      const response = await routes.patients.getForAppointment();
      setPatients(
        response.data.map((patient: any) => ({
          label: `${patient.name} ${patient.lastName}`,
          value: patient.id,
        })),
      );
    } catch (error: any) {
      if (!error?.response) setNotification(true, 'Network error');
      else setNotification(true, `${error.message}: ${error.response.data.message}`);
    }
  };

  const getPractitioners = async () => {
    try {
      const response = await routes.users.getPractitioners();
      setPractitioners(
        response.data.map((practitioner: any) => ({
          label: `${practitioner.name} ${practitioner.lastName}`,
          value: practitioner.uid,
        })),
      );
    } catch (error: any) {
      if (!error?.response) setNotification(true, 'Network error');
      else setNotification(true, `${error.message}: ${error.response.data.message}`);
    }
  };

  useEffect(() => {
    getPatients();
    getPractitioners();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const form = useForm({
    initialValues: {
      patientId: '',
      date: '',
      practitioner: '',
      kind: '',
    },

    validate: {
      patientId: isNotEmpty('Patient is required'),
      date: isNotEmpty('Date is required'),
      practitioner: isNotEmpty('Practitioner is required'),
      kind: isNotEmpty('Kind is required'),
    },
  });

  return (
    <Modal.Root opened={show} onClose={handleClose}>
      <Modal.Overlay
        color={colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2]}
        opacity={0.55}
        blur={3}
      />
      <Modal.Content>
        <Modal.Header>
          <Modal.Title>
            <Text size="xl" fw={700}>
              Add Appointment
            </Text>
          </Modal.Title>
          <Modal.CloseButton />
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleClick}>
            <Grid columns={12}>
              <Grid.Col span={12}>
                <DateTimePicker
                  // onPointerEnterCapture={undefined}
                  // onPointerLeaveCapture={undefined}
                  label="Date"
                  placeholder="Date"
                  withAsterisk
                  {...form.getInputProps('date')}
                />
              </Grid.Col>
              <Grid.Col span={12}>
                <Select
                  label="Patient"
                  placeholder="Patient"
                  withAsterisk
                  {...form.getInputProps('patientId')}
                  data={patients}
                  searchable
                  nothingFoundMessage="No patients found, ensure you have created a patient first"
                />
              </Grid.Col>
              <Grid.Col span={12}>
                <Select
                  label="Kind"
                  placeholder="Kind"
                  withAsterisk
                  data={['first-visit', 'follow-up', 'pediatrics', 'maternity', 'emergency']}
                  searchable
                  comboboxProps={{ position: 'bottom', middlewares: { flip: false, shift: false } }}
                  {...form.getInputProps('kind')}
                />
              </Grid.Col>
              <Grid.Col span={12}>
                <Select
                  label="Practitioner"
                  placeholder="Practitioner"
                  withAsterisk
                  {...form.getInputProps('practitioner')}
                  data={practitioners}
                  searchable
                  nothingFoundMessage="No practitioners found, ensure you have created a practitioner first"
                />
              </Grid.Col>
            </Grid>
            <Group align="right" p="md">
              <Button variant="light" color="red" onClick={handleClose}>
                Cancel
              </Button>
              <Button color="green" type="submit">
                Submit
              </Button>
            </Group>
          </form>
        </Modal.Body>
      </Modal.Content>
    </Modal.Root>
  );
};

export default ModalCreateApp;
